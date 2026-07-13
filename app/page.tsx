import { createClient } from '@/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CTASection } from '@/components/home/cta-section'
import { MOCK_PRODUCTS } from '@/lib/mock-products'

export default async function HomePage() {
  let products: Product[] = []
  
  try {
    const supabase = await createClient()
    
    // First try to get featured products
    const { data: featured } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8)
      .order('created_at', { ascending: false })

    if (featured && featured.length > 0) {
      products = featured as Product[]
    } else {
      // If no featured products, get the latest products
      const { data: allProducts } = await supabase
        .from('products')
        .select('*')
        .limit(8)
        .order('created_at', { ascending: false })
      if (allProducts) {
        products = allProducts as Product[]
      }
    }
  } catch (error) {
    console.warn('Failed to fetch products from Supabase, falling back to mock data:', error)
  }

  // Fallback to mock products if database is empty or failed
  if (!products || products.length === 0) {
    products = MOCK_PRODUCTS.slice(0, 8)
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
