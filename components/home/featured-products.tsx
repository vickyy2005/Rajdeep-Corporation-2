'use client'

import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'
import { ScrollReveal } from '@/components/scroll-reveal'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const showPlaceholder = products.length === 0

  return (
    <section className="relative bg-slate-50/50 border-t border-slate-100 py-20 sm:py-28 overflow-hidden">
      {/* Decorative blurred glow elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-12 right-1/4 w-[350px] h-[350px] bg-teal-300/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-12 left-1/4 w-[350px] h-[350px] bg-blue-300/20 rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h-30v-30h30zm-10 10h-10v10h10v-10z' fill='%230f172a' fill-opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row border-b border-slate-100 pb-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3.5 py-1 text-[11px] font-extrabold text-blue-700 tracking-wider uppercase mb-3 shadow-xs">
                <Tag className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                <span>Premium Stock</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Industrial Products</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
                Explore our most sought-after pipes, valves, fittings, and flanges.
              </p>
            </div>
            <Button asChild variant="outline" className="group shrink-0 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 rounded-xl h-11 px-6 font-semibold transition-all shadow-sm">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        {showPlaceholder ? (
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="mt-12">
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 sm:p-12 text-center max-w-xl mx-auto">
                <p className="text-slate-500 font-medium">
                  Featured products will appear here. Add products and mark them as featured in the admin dashboard.
                </p>
                <Button asChild variant="outline" className="mt-6 border-slate-300 text-slate-600 hover:bg-slate-50">
                  <Link href="/products">
                    Browse All Products
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <ScrollReveal 
                key={product.id} 
                animation="fade-up" 
                delay={index * 100}
                duration={600}
              >
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
