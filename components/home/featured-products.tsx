'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // If no products, show a placeholder section
  const showPlaceholder = products.length === 0

  return (
    <section className="bg-slate-50/50 border-t border-slate-100 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row animate-fade-up">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Featured Industrial Products
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium">
              Our most sought-after pipes, valves, fittings, and flanges.
            </p>
          </div>
          <Button asChild variant="outline" className="group shrink-0 border-slate-200 text-slate-700 hover:bg-slate-100 transition-all duration-300 font-semibold">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {showPlaceholder ? (
          <div className="mt-10 animate-fade-up stagger-1">
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center">
              <p className="text-slate-400">
                Featured products will appear here. Add products and mark them as featured in the admin dashboard.
              </p>
              <Button asChild variant="outline" className="mt-4 border-slate-200 text-slate-650 hover:bg-slate-50">
                <Link href="/products">
                  Browse All Products
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <div 
                key={product.id} 
                className={`animate-fade-up stagger-${index + 1}`}
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
