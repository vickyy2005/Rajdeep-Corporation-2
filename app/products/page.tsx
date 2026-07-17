import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/products/product-filters'
import { Spinner } from '@/components/ui/spinner'
import { Package } from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/mock-products'
import type { Product, Category } from '@/lib/types'
import type { Metadata } from 'next'
import { ParticleBackground } from '@/components/particle-background'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Products | Rajdeep Corporation',
  description: 'Browse our complete range of industrial pipes, fittings, valves, and flanges.',
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

async function ProductGrid({ category, search }: { category?: string; search?: string }) {
  let products: Product[] = []
  let hasError = false

  try {
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

    const { data, error } = await query
    if (error) {
      console.warn('Supabase error loading products:', error)
      hasError = true
    } else if (data) {
      products = data as Product[]
    }
  } catch (error) {
    console.warn('Failed to fetch products from Supabase, falling back to mock data:', error)
    hasError = true
  }

  // Fallback to mock products if database is empty or failed
  if (hasError || !products || products.length === 0) {
    let mockProducts = MOCK_PRODUCTS
    if (category && ['pipes', 'fittings', 'valves', 'flanges'].includes(category)) {
      mockProducts = mockProducts.filter(p => p.category === category)
    }
    if (search) {
      mockProducts = mockProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }
    products = mockProducts
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 max-w-md mx-auto animate-fade-in">
        <Package className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-4 text-sm font-bold text-slate-900">No products found</h3>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Try adjusting your search terms or category filter.
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
          <ScrollReveal 
            key={product.id} 
            animation="fade-up" 
            delay={(index % 4) * 100}
            duration={600}
          >
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white/80 overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-slate-100" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-2/3" />
          </div>
          <div className="p-4 sm:p-5 pt-0">
            <div className="h-10 bg-slate-200 rounded" />
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
    <div className="flex min-h-screen flex-col bg-transparent text-slate-800">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 border-b border-slate-950 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="products-hero-pattern absolute inset-0" />
          </div>
          <ParticleBackground density={25} speedMultiplier={0.25} />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white animate-fade-up">
              Our Products Catalog
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl animate-fade-up stagger-1">
              Browse our complete range of high-performance industrial pipes, fittings, valves, and flanges.
            </p>
          </div>
        </section>

        {/* Products section */}
        <section className="py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductFilters currentCategory={category} currentSearch={search} />
            
            <div className="mt-8">
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
