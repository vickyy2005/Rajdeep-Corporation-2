import { createClient } from '@/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CTASection } from '@/components/home/cta-section'
import type { Product } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()
  
  // First try to get featured products
  let { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(8)
    .order('created_at', { ascending: false })

  // If no featured products, get the latest products
  if (!products || products.length === 0) {
    const { data: allProducts } = await supabase
      .from('products')
      .select('*')
      .limit(8)
      .order('created_at', { ascending: false })
    products = allProducts
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts products={(products as Product[]) || []} />
        <CTASection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
