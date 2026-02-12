import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { z } from "zod";

const PRODUCTS_CACHE_KEY = "products:all";

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: List all products (Cached)
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized
 *   post:
 *     description: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
});

export async function GET(req: Request) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check cache
    const cachedProducts = await redis.get(PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      console.log("Cache hit:", typeof cachedProducts, cachedProducts);
      if (typeof cachedProducts === "object") {
        return NextResponse.json(cachedProducts);
      }
      try {
        return NextResponse.json(JSON.parse(cachedProducts as string));
      } catch (e) {
        console.error("JSON Parse Error for cache:", e);
        // If parse fails, ignore cache and fetch from db
      }
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Cache for 60 seconds
    await redis.set(PRODUCTS_CACHE_KEY, JSON.stringify(products), { ex: 60 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const user: any = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // RBAC check: Only ADMIN or USER can create? Goal says Role-based access (user vs admin).
  // Let's restrict creation to ADMIN for demonstration, or allow both but maybe only ADMIN can delete.
  // The requirement says "Perform CRUD actions", implies user can create too.
  // But let's verify if role is needed. "Role-based access (user vs admin)".
  // Let's assume anyone can create for now, but only ADMIN can delete or update others' (if ownership exists).
  // Current schema doesn't have ownerId on product.
  // Let's add ownerId to Product next time if needed, but for now simple CRUD.

  try {
    const body = await req.json();
    const { name, description, price } = createProductSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    // Invalidate cache
    await redis.del(PRODUCTS_CACHE_KEY);

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    // Type cast error to unknown for safer handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: (error as any).errors },
        { status: 400 },
      );
    }
    console.error("POST Error:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
