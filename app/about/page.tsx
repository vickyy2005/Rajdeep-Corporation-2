import Link from 'next/link'
import { ArrowRight, Award, Users, Package, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Rajdeep Corporation',
  description: 'Learn about Rajdeep Corporation - your trusted partner for industrial pipes, fittings, valves, and flanges since 2005.',
}

const stats = [
  { icon: Clock, value: '18+', label: 'Years Experience' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: Package, value: '500+', label: 'Products' },
  { icon: Award, value: '100%', label: 'Quality Commitment' },
]

const values = [
  {
    title: 'Quality First',
    description: 'We source only the highest quality materials from certified manufacturers, ensuring every product meets international standards.',
  },
  {
    title: 'Customer Focus',
    description: 'Your success is our priority. We work closely with clients to understand their needs and provide tailored solutions.',
  },
  {
    title: 'Competitive Pricing',
    description: 'Through strong manufacturer relationships and efficient operations, we offer the best prices without compromising quality.',
  },
  {
    title: 'Timely Delivery',
    description: 'We maintain extensive inventory and efficient logistics to ensure your orders are delivered on time, every time.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              About Rajdeep Corporation
            </h1>
            <p className="mt-2 text-lg text-primary-foreground/80">
              Your trusted partner in industrial piping solutions since 2005
            </p>
          </div>
        </section>

        {/* Story section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Our Story
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2005, Rajdeep Corporation began with a simple mission: to provide 
                    high-quality industrial piping products at competitive prices with exceptional 
                    customer service.
                  </p>
                  <p>
                    Over the years, we have grown from a small trading company to one of the most 
                    trusted names in the industrial piping industry. Our commitment to quality and 
                    customer satisfaction has earned us partnerships with leading manufacturers and 
                    the trust of hundreds of businesses across India.
                  </p>
                  <p>
                    Today, we offer a comprehensive range of pipes, fittings, valves, and flanges 
                    in various materials and specifications, serving diverse industries including 
                    oil &amp; gas, petrochemical, power, and construction.
                  </p>
                </div>
                <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square rounded-xl bg-muted overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                  <div className="text-center">
                    <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-4xl">
                      RC
                    </div>
                    <p className="mt-4 text-2xl font-bold text-foreground">Rajdeep Corporation</p>
                    <p className="text-muted-foreground">Since 2005</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="mt-4 text-4xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="mt-1 text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Our Core Values
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Ready to Work Together?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Contact us today for competitive quotes on all your industrial piping needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
