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
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('id', id)
    .single()

  if (!product) {
    return { title: 'Product Not Found | Rajdeep Corporation' }
  }

  return {
    title: `${product.name} | Rajdeep Corporation`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  const typedProduct = product as Product

  const categoryColors = {
    pipes: 'bg-blue-100 text-blue-800',
    fittings: 'bg-green-100 text-green-800',
    valves: 'bg-amber-100 text-amber-800',
    flanges: 'bg-purple-100 text-purple-800',
  }

  const WHATSAPP_NUMBER = '917021003269'
  const whatsappMessage = `Hello! I am interested in ${typedProduct.name}. Please provide more details and pricing.`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Link 
              href="/products" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                {typedProduct.image_url ? (
                  <img
                    src={typedProduct.image_url}
                    alt={typedProduct.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <span className="text-8xl font-bold text-muted-foreground/20">
                      {typedProduct.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div>
                <Badge className={categoryColors[typedProduct.category]}>
                  {typedProduct.category.charAt(0).toUpperCase() + typedProduct.category.slice(1)}
                </Badge>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {typedProduct.name}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {typedProduct.description}
                </p>

                {/* Specifications */}
                {typedProduct.specifications && Object.keys(typedProduct.specifications).length > 0 && (
                  <Card className="mt-8">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="divide-y divide-border">
                        {Object.entries(typedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-3">
                            <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                            <dd className="text-sm text-foreground">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                )}

                {/* Action buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#quote-form">
                      Request Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quote request form */}
            <div id="quote-form" className="mt-16 scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Request a Quote</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you with pricing details.
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
