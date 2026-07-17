import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuoteRequestForm } from '@/components/products/quote-request-form'
import type { Metadata } from 'next'
import { ParticleBackground } from '@/components/particle-background'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Contact Us | Rajdeep Corporation',
  description: 'Get in touch with Rajdeep Corporation for industrial pipes, fittings, valves, and flanges. Request a quote today.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Direct Phone / WhatsApp',
    details: ['+91 70210 03269', '+91 22 4567 8901'],
    href: 'tel:+917021003269',
    color: 'text-amber-500 bg-amber-500/10'
  },
  {
    icon: Mail,
    title: 'Sales & Inquiries Email',
    details: ['sales@rajdeepcorp.com', 'info@rajdeepcorp.com'],
    href: 'mailto:sales@rajdeepcorp.com',
    color: 'text-blue-500 bg-blue-500/10'
  },
  {
    icon: MapPin,
    title: 'Corporate Headquarters',
    details: ['Office 302, Steel Market Chamber', 'Loha Bhavan, Kalamboli, Navi Mumbai', 'Maharashtra, India - 410218'],
    color: 'text-rose-500 bg-rose-500/10'
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    details: ['Monday - Saturday', '9:30 AM - 6:30 PM (IST)'],
    color: 'text-emerald-500 bg-emerald-500/10'
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-slate-855">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 py-16 sm:py-20 border-b border-slate-955">
          <div className="absolute inset-0 opacity-5">
            <div className="products-hero-pattern absolute inset-0" />
          </div>
          <ParticleBackground density={25} speedMultiplier={0.25} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-fade-down">
              Contact Our Sales Team
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl animate-fade-up font-medium">
              Ready to supply your next project. Request pricing, catalogs, or technical details instantly.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Contact info */}
              <div className="lg:col-span-5">
                <ScrollReveal animation="slide-left" duration={700}>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-wide">Connect Instantly</h2>
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed font-medium">
                        Have a detailed bill of materials? Send it over to our sales staff, or give us a call for immediate assistance on stock levels.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {contactInfo.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-5 items-start p-4 rounded-2xl hover:bg-slate-100/70 transition-all duration-300 group"
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                            <item.icon className="h-5.5 w-5.5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-sm text-slate-800 tracking-wide group-hover:text-slate-900 transition-colors">{item.title}</h3>
                            <div className="space-y-1">
                              {item.details.map((detail, index) => (
                                item.href ? (
                                  <a
                                    key={index}
                                    href={item.href}
                                    className="block text-xs sm:text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
                                  >
                                    {detail}
                                  </a>
                                ) : (
                                  <p key={index} className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                                    {detail}
                                  </p>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Quote request form */}
              <div className="lg:col-span-7">
                <ScrollReveal animation="slide-right" duration={700}>
                  <Card className="neumorphic-card neumorphic-card-hover border-none p-1 sm:p-2 rounded-3xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-slate-900 tracking-wide font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Request a B2B Quote</CardTitle>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Provide your project details and specifications, and we will get back to you with pricing details within 24 hours.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <QuoteRequestForm />
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="py-12 border-t border-slate-200 bg-slate-100/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" duration={800}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-1 shadow-2xl">
                <div className="relative aspect-[21/9] w-full min-h-[300px] overflow-hidden rounded-xl bg-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6685718712754!2d73.10091331538356!3d19.00125798713175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1e555555555%3A0xe54ef92c10c1409f!2sKalamboli%20Steel%20Market!5e0!3m2!1sen!2sin!4v1657891234567!5m2!1sen!2sin"
                    className="absolute inset-0 h-full w-full border-0 filter grayscale opacity-80 hover:grayscale-0 transition-all duration-300"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-slate-200/10 pointer-events-none" />
                  
                  {/* Map Overlay Card */}
                  <div className="absolute bottom-6 left-6 hidden sm:block max-w-xs rounded-xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-605 border border-blue-100">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Kalamboli Steel Market</p>
                        <p className="mt-1 text-[10px] text-slate-500 leading-normal font-medium">
                          Office 302, Steel Market Chamber, Navi Mumbai, MH 410218
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
