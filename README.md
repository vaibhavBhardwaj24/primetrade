# PrimeTrade - Scalable REST API & Frontend

## Overview

A scalable full-stack application built with Next.js 15, Prisma, PostgreSQL (Neon), and Upstash Redis. It features secure authentication, role-based access control, and a responsive frontend.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Caching**: Upstash Redis
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS
- **Documentation**: Swagger UI

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database URL
- Upstash Redis URL & Token

### Installation

1. Clone the repository at `c:/Users/Vaibhav/Desktop/code/assignmen/primetrade`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL="..."
   JWT_SECRET="..."
   UPSTASH_REDIS_REST_URL="..."
   UPSTASH_REDIS_REST_TOKEN="..."
   ```
4. Push database schema:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## API Documentation

Access the Swagger UI at `http://localhost:3000/docs`.

## Scalability

Refer to `SCALABILITY.md` for details on the architecture and scalability strategies.
