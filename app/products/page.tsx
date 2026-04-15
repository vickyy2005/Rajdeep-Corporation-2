import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/products/product-filters'
import { Spinner } from '@/components/ui/spinner'
import { Package } from 'lucide-react'
import type { Product, Category } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Rajdeep Corporation',
  description: 'Browse our complete range of industrial pipes, fittings, valves, and flanges.',
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

async function ProductGrid({ category, search }: { category?: string; search?: string }) {
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .order('name')

  if (category && ['pipes', 'fittings', 'valves', 'flanges'].includes(category)) {
    query = query.eq('category', category as Category)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data: products, error } = await query

  if (error) {
    return (
      <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-8 sm:p-12 text-center animate-fade-up">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
          <Package className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-destructive">Error loading products</h3>
        <p className="mt-2 text-muted-foreground">Please try again later.</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 sm:p-12 text-center animate-fade-up">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Package className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No products found</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          {search 
            ? `No products matching "${search}" were found. Try a different search term.`
            : category 
              ? `No products in the ${category} category yet. Check back soon!`
              : 'No products available at the moment. Please check back later.'
          }
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-6 animate-fade-in">
        Showing {products.length} product{products.length !== 1 ? 's' : ''}
        {category && ` in ${category}`}
        {search && ` matching "${search}"`}
      </p>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(products as Product[]).map((product, index) => (
          <div key={product.id} className={`animate-fade-up stagger-${Math.min(index + 1, 8)}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-xl border bg-card overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-muted" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
          <div className="p-4 sm:p-5 pt-0">
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const category = params.category
  const search = params.search

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-10 sm:py-12 lg:py-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="products-hero-pattern absolute inset-0" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary-foreground animate-fade-up">
              Our Products
            </h1>
            <p className="mt-2 text-base sm:text-lg text-primary-foreground/80 max-w-2xl animate-fade-up stagger-1">
              Browse our complete range of quality industrial pipes, fittings, valves, and flanges
            </p>
          </div>
        </section>

        {/* Products section */}
        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductFilters currentCategory={category} currentSearch={search} />
            
            <div className="mt-6 sm:mt-8">
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid category={category} search={search} />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
