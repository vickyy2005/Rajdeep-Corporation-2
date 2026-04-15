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
    <section className="bg-gradient-to-b from-muted/30 to-muted/50 py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row animate-fade-up">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
              Featured Products
            </h2>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">
              Our most popular industrial piping products
            </p>
          </div>
          <Button asChild variant="outline" className="group shrink-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {showPlaceholder ? (
          <div className="mt-8 sm:mt-10 animate-fade-up stagger-1">
            <div className="rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 p-8 sm:p-12 text-center">
              <p className="text-muted-foreground">
                Featured products will appear here. Add products and mark them as featured in the admin dashboard.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/products">
                  Browse All Products
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
