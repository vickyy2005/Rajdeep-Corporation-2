import type { MetadataRoute } from 'next'
import { MOCK_PRODUCTS } from '@/lib/mock-products'
import { CATEGORIES } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajdeepcorporation.com'

  let products: { id: string; updated_at?: string }[] = MOCK_PRODUCTS

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('ujewukrgqlmiefiwnjfy.supabase.co')) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data } = await supabase.from('products').select('id, updated_at').eq('is_active', true)
      if (data && data.length > 0) {
        products = data
      }
    } catch (err) {
      // fallback to MOCK_PRODUCTS if DB fetch fails
    }
  }

  // Core static page routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Category and Subcategory routes
  const categoryRoutes: MetadataRoute.Sitemap = []
  for (const cat of CATEGORIES) {
    categoryRoutes.push({
      url: `${baseUrl}/products?category=${cat.value}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        if (sub.value !== cat.value) {
          categoryRoutes.push({
            url: `${baseUrl}/products?category=${sub.value}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        }
      }
    }
  }

  // Product detail pages
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
