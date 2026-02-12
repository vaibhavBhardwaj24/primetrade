import Link from "next/link";
import { ArrowRight, Shield, Zap, TrendingUp, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Master Your <span className="text-blue-500">Inventory</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              PrimeTrade empowers businesses to manage products, track pricing, and ensure secure
              access with enterprise-grade tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white transition-all"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PrimeTrade?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for performance, security, and scalability. Everything you need to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Secure by Default
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enterprise-grade authentication and rigid role-based access control to keep your data safe.
              </p>
            </div>

            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Powered by Redis caching and optimized database queries for instant data retrieval.
              </p>
            </div>

            <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Built to Scale
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Leveraging Next.js and PostgreSQL to handle your growth from startup to enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Section */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trusted by Modern Teams</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder logos for visual completeness */}
            <div className="flex items-center space-x-2 text-xl font-bold text-gray-400">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div> <span>Acme Corp</span>
            </div>
            <div className="flex items-center space-x-2 text-xl font-bold text-gray-400">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div> <span>Global Tech</span>
            </div>
            <div className="flex items-center space-x-2 text-xl font-bold text-gray-400">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div> <span>Nebula Inc</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 dark:bg-gray-900 text-center border-t border-gray-200 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} PrimeTrade. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
