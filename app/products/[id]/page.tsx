import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuoteRequestForm } from '@/components/products/quote-request-form'
import { MOCK_PRODUCTS } from '@/lib/mock-products'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  let name = ''
  let description = ''

  try {
    const supabase = await createClient()
    const { data: product } = await supabase
      .from('products')
      .select('name, description')
      .eq('id', id)
      .single()

    if (product) {
      name = product.name
      description = product.description || ''
    }
  } catch (error) {
    console.warn('Failed to get product metadata from Supabase:', error)
  }

  if (!name) {
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === id)
    if (mockProduct) {
      name = mockProduct.name
      description = mockProduct.description
    }
  }

  if (!name) {
    return { title: 'Product Not Found | Rajdeep Corporation' }
  }

  return {
    title: `${name} | Rajdeep Corporation`,
    description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  let product: Product | null = null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (!error && data) {
      product = data as Product
    }
  } catch (error) {
    console.warn('Failed to fetch product from Supabase:', error)
  }

  if (!product) {
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === id)
    if (mockProduct) {
      product = mockProduct
    }
  }

  if (!product) {
    notFound()
  }

  const typedProduct = product

  const categoryColors = {
    pipes: 'bg-blue-50 text-blue-700 border-blue-100 border',
    fittings: 'bg-emerald-50 text-emerald-705 border-emerald-100 border',
    valves: 'bg-amber-50 text-amber-705 border-amber-100 border',
    flanges: 'bg-violet-50 text-violet-755 border-violet-100 border',
  }

  const WHATSAPP_NUMBER = '917021003269'
  const whatsappMessage = `Hello! I am interested in ${typedProduct.name}. Please provide more details and pricing.`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Link 
              href="/products" 
              className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors font-semibold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>

        {/* Product details */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-md">
                {typedProduct.image_url ? (
                  <img
                    src={typedProduct.image_url}
                    alt={typedProduct.name}
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-30" />
                    <span className="text-8xl font-extrabold text-slate-300 tracking-wider select-none">
                      {typedProduct.name.split(' ').map(word => word[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div>
                <Badge className={categoryColors[typedProduct.category]}>
                  {typedProduct.category.charAt(0).toUpperCase() + typedProduct.category.slice(1)}
                </Badge>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {typedProduct.name}
                </h1>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {typedProduct.description}
                </p>

                {/* Specifications */}
                {typedProduct.specifications && Object.keys(typedProduct.specifications).length > 0 && (
                  <Card className="mt-8 bg-white border-slate-200 shadow-md backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-900">Technical Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="divide-y divide-slate-100">
                        {Object.entries(typedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-3">
                            <dt className="text-sm font-semibold text-slate-500">{key}</dt>
                            <dd className="text-sm text-slate-800 font-medium">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                )}

                {/* Action buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 font-bold">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100 text-slate-705 font-semibold">
                    <Link href="#quote-form">
                      Request B2B Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quote request form */}
            <div id="quote-form" className="mt-16 scroll-mt-24 animate-fade-up">
              <Card className="bg-white border-slate-200 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Request a B2B Quote for {typedProduct.name}</CardTitle>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Submit your sizing, material grade, and quantity requirements to receive a fast commercial quote.
                  </p>
                </CardHeader>
                <CardContent>
                  <QuoteRequestForm productId={typedProduct.id} productName={typedProduct.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton productName={typedProduct.name} />
    </div>
  )
}
