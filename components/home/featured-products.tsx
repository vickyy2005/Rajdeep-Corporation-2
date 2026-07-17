'use client'

import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const showPlaceholder = products.length === 0

  return (
    <section className="bg-slate-50/50 border-t border-slate-100 py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row border-b border-slate-100 pb-8 animate-fade-up">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] font-extrabold text-blue-700 tracking-wider uppercase mb-3">
              <Tag className="h-3.5 w-3.5 text-blue-600" />
              <span>Premium Stock</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Featured Industrial Products
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
              Explore our most sought-after pipes, valves, fittings, and flanges.
            </p>
          </div>
          <Button asChild variant="outline" className="group shrink-0 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 rounded-xl h-11 px-6 font-semibold transition-all shadow-sm">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Content Grid */}
        {showPlaceholder ? (
          <div className="mt-12 animate-fade-up">
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
        ) : (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
