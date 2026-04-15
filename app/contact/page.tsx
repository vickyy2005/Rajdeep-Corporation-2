import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuoteRequestForm } from '@/components/products/quote-request-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Rajdeep Corporation',
  description: 'Get in touch with Rajdeep Corporation for industrial pipes, fittings, valves, and flanges. Request a quote today.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 70210 03269', '+91 22 1234 5678'],
    href: 'tel:+917021003269',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@rajdeepcorp.com', 'sales@rajdeepcorp.com'],
    href: 'mailto:info@rajdeepcorp.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['Industrial Area, Phase-2', 'Mumbai, Maharashtra 400001'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Saturday', '9:00 AM - 6:00 PM'],
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-2 text-lg text-primary-foreground/80">
              Get in touch with our team for quotes and inquiries
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact info */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
                <p className="mt-2 text-muted-foreground">
                  We&apos;re here to help with all your industrial piping needs.
                </p>

                <div className="mt-8 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        {item.details.map((detail, index) => (
                          item.href ? (
                            <a
                              key={index}
                              href={item.href}
                              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={index} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote request form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Request a Quote</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <QuoteRequestForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[21/9] bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 text-muted-foreground">
                    Industrial Area, Phase-2, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
