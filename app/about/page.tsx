import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award, Users, Package, Clock, ShieldCheck, Heart, ThumbsUp, TrendingUp } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { ParticleBackground } from '@/components/particle-background'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'About Us | RAJDEEP CORPORATION',
  description: 'Learn about RAJDEEP CORPORATION - your trusted partner for industrial pipes, fittings, valves, and flanges since 2019.',
}

const stats = [
  { icon: Clock, value: 'Since 2019', label: 'Years Experience', description: 'Serving B2B industries since 2019' },
  { icon: Users, value: '1000+', label: 'Happy Clients', description: 'Across manufacturing & engineering sectors' },
  { icon: Package, value: '100+', label: 'Products', description: 'Comprehensive catalog of quality parts' },
  { icon: Award, value: '100%', label: 'Quality Assured', description: 'Committed to international standards' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    description: 'We source only the highest quality materials from ISO-certified manufacturers, ensuring every product meets international standards and pressure ratings.',
    hoverBg: 'from-blue-50/70 via-white to-blue-50/30',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50/60 border-blue-100/70',
    borderGlow: 'group-hover:border-blue-400/50',
    topBar: 'from-blue-500 to-blue-600',
    hoverText: 'group-hover:text-blue-600',
    shadowGlow: 'hover:shadow-blue-500/5',
  },
  {
    icon: Heart,
    title: 'Customer-Centric',
    description: 'Your success is our priority. We work closely with procurement managers and engineers to understand project requirements and provide tailored solutions.',
    hoverBg: 'from-rose-50/70 via-white to-rose-50/30',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50/60 border-rose-100/70',
    borderGlow: 'group-hover:border-rose-400/50',
    topBar: 'from-rose-500 to-rose-600',
    hoverText: 'group-hover:text-rose-600',
    shadowGlow: 'hover:shadow-rose-500/5',
  },
  {
    icon: ThumbsUp,
    title: 'Fair Pricing',
    description: 'Through strong manufacturer relationships and efficient logistics operations, we offer competitive trade pricing without compromising quality.',
    hoverBg: 'from-emerald-50/70 via-white to-emerald-50/30',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50/60 border-emerald-100/70',
    borderGlow: 'group-hover:border-emerald-400/50',
    topBar: 'from-emerald-500 to-emerald-600',
    hoverText: 'group-hover:text-emerald-600',
    shadowGlow: 'hover:shadow-emerald-500/5',
  },
  {
    icon: TrendingUp,
    title: 'Timely Delivery',
    description: 'We maintain an extensive, ready-to-ship inventory in our warehouses to ensure your orders are delivered on schedule, minimizing downtime.',
    hoverBg: 'from-amber-50/70 via-white to-amber-50/30',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50/60 border-amber-100/70',
    borderGlow: 'group-hover:border-amber-400/50',
    topBar: 'from-amber-500 to-amber-600',
    hoverText: 'group-hover:text-amber-600',
    shadowGlow: 'hover:shadow-amber-500/5',
  },
]

const milestones = [
  { year: '2019', title: 'Company Founded', description: 'RAJDEEP CORPORATION was established with a focus on trading steel pipes and basic fittings in Mumbai.' },
  { year: '2021', title: 'Expansion & Partnerships', description: 'Established direct partnerships with leading national manufacturers, adding valves and flanges to our catalog.' },
  { year: '2023', title: 'Warehouse Scale-Up', description: 'Opened a state-of-the-art storage facility, increasing stock capacity by 300% to support fast pan-India delivery.' },
  { year: '2026', title: 'Digital Procurement', description: 'Launched a digital inquiry system to streamline quotes for B2B procurement teams and engineering firms.' },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-slate-800">
      <SiteHeader />
      <main className="flex-1">
        {/* Page header with floating particles and glassmorphic backdrop */}
        <section className="relative overflow-hidden bg-[#0a0f1d] py-24 border-b border-slate-800/80">
          {/* Animated Background Blobs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/25 blur-[120px] animate-blob pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/25 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '-12s' }} />

          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-[#0a0f1d]/40 backdrop-blur-[10px] pointer-events-none" />

          {/* Floating Particles */}
          <ParticleBackground density={30} speedMultiplier={0.3} />

          {/* Centered Content */}
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-fade-down">
              About Rajdeep Corporation
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl animate-fade-up stagger-1 font-medium leading-relaxed">
              Connecting Indian industries with high-performance piping solutions, fittings, and control valves.
            </p>
          </div>
        </section>

        {/* Story section */}
        <section className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
          {/* Subtle background graphic for simple styling */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid gap-16 lg:grid-cols-12 items-center">
              
              {/* Left Column (Text & CTA) */}
              <div className="lg:col-span-7 space-y-6">
                <ScrollReveal animation="fade-up" duration={700}>
                  <div className="space-y-3">
                    <span className="inline-block text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 border border-blue-100/80 px-3 py-1 rounded-full">
                      Our History
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                      Our Legacy of Trust & Quality
                    </h2>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal animation="fade-up" duration={700} delay={150}>
                  <div className="space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                    <p>
                      Founded in 2005, Rajdeep Corporation began with a simple mission: to supply 
                      industrial piping products of uncompromised quality at competitive trade prices.
                    </p>
                    <p>
                      Over nearly two decades, we have evolved from a regional trading company to a prominent 
                      B2B supplier. Our commitment to strict material verification and customer-first service 
                      has earned us the trust of manufacturing plants, petrochemical facilities, power plants, 
                      and construction companies nationwide.
                    </p>
                    <p>
                      We act not just as a distributor, but as an extension of your procurement team, ensuring 
                      proper specification alignment, complete certification documentation, and reliable scheduling.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal animation="fade-up" duration={700} delay={300}>
                  <div className="pt-2">
                    <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-300 font-bold px-6 py-5 rounded-xl">
                      <Link href="/contact">
                        Work With Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column (Minimalist Trust Card) */}
              <div className="lg:col-span-5">
                <ScrollReveal animation="scale-in" duration={800} delay={200}>
                  <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col gap-6 justify-between group">
                    {/* Background glowing effects */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Logo Header */}
                    <div className="flex items-center gap-4 relative z-10">
                      <Image
                        src="/logo.png"
                        alt="Rajdeep Corporation Logo"
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">Rajdeep Corporation</h3>
                        <p className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mt-0.5">ESTD. 2005</p>
                      </div>
                    </div>

                    {/* Core trust tags */}
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-2 relative z-10">
                      {[
                        { icon: ShieldCheck, text: 'ISO 9001:2015 Certified', color: 'text-emerald-500 bg-emerald-50/50 border-emerald-100/30' },
                        { icon: Award, text: 'Top Industrial Brand', color: 'text-blue-500 bg-blue-50/50 border-blue-100/30' },
                        { icon: Package, text: '500+ Active SKUs', color: 'text-indigo-500 bg-indigo-50/50 border-indigo-100/30' },
                        { icon: Users, text: '1000+ B2B Clients', color: 'text-amber-500 bg-amber-50/50 border-amber-100/30' }
                      ].map((tag, idx) => {
                        const IconComponent = tag.icon;
                        return (
                          <div 
                            key={idx} 
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border ${tag.color} hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
                          >
                            <IconComponent className="h-5 w-5 shrink-0" />
                            <span className="text-xs font-bold text-slate-700">{tag.text}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t border-slate-100 pt-5 mt-1 relative z-10">
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold italic text-center px-2">
                        "Delivering engineering compliance and high-durability products to India's major infrastructure initiatives."
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
              
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="bg-transparent border-y border-slate-200/80 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, idx) => (
                <ScrollReveal 
                  key={idx} 
                  animation="fade-up" 
                  delay={idx * 100}
                  duration={600}
                >
                  <div className="group text-center p-6 rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-sm hover:border-blue-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-7 w-7" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                    <div className="mt-1 font-bold text-slate-700 text-sm">{stat.label}</div>
                    <div className="mt-2 text-xs text-slate-500 leading-normal font-medium">{stat.description}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline section */}
        <section className="py-16 sm:py-24 bg-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" duration={700}>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Our Journey & Milestones
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
                  Key chapters of growth and adaptation that shaped who we are today.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-16 relative border-l-4 border-slate-100 max-w-3xl mx-auto pl-8 sm:pl-12 space-y-12">
              {/* Pipe connection line representation */}
              <div className="absolute left-[2px] top-4 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 h-[calc(100%-32px)] opacity-85" />
              
              {milestones.map((milestone, idx) => (
                <ScrollReveal 
                  key={idx} 
                  animation="fade-up" 
                  delay={idx * 100}
                  duration={600}
                >
                  <div className="relative group">
                    {/* Timeline joint (glowing valve bullet) */}
                    <div className="absolute -left-[42px] sm:-left-[58px] top-1.5 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-50 transition-all duration-300 shadow-md">
                      <div className="h-2 w-2 rounded-full bg-slate-400 group-hover:bg-blue-600 transition-colors duration-300 animate-pulse" />
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-blue-400/50 hover:bg-white hover:-translate-y-1 transition-all duration-300">
                      <span className="inline-block text-blue-605 font-bold text-xs sm:text-sm bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-650 transition-colors">{milestone.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">{milestone.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="bg-transparent py-16 sm:py-24 border-t border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" duration={700}>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Core Foundations
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-500 font-medium">
                  The core principles that govern our operations and quality control.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, idx) => (
                <ScrollReveal 
                  key={idx} 
                  animation="fade-up" 
                  delay={idx * 100}
                  duration={600}
                >
                  <Card 
                    className={cn(
                      "relative overflow-hidden bg-white/80 border-slate-200 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group h-full",
                      value.borderGlow,
                      value.shadowGlow,
                      "hover:-translate-y-1.5"
                    )}
                  >
                    {/* Background gradient fade-in on hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      value.hoverBg
                    )} />

                    {/* Animated top custom-colored border indicator */}
                    <div className={cn(
                      "absolute top-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full bg-gradient-to-r",
                      value.topBar
                    )} />

                    <CardContent className="pt-8 pb-6 px-6 relative z-10">
                      <div className={cn(
                        "relative inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 mb-6 group-hover:scale-110 shadow-sm border",
                        value.iconBg,
                        value.iconColor,
                        "group-hover:text-white"
                      )}>
                        {/* Background fill container */}
                        <div className={cn(
                          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br transition-all duration-300 z-[-1]",
                          value.topBar
                        )} />
                        <value.icon className="h-5 w-5 relative z-10" />
                      </div>
                      <h3 className={cn(
                        "text-lg font-bold text-slate-900 tracking-wide transition-colors",
                        value.hoverText
                      )}>
                        {value.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 sm:py-20 border-t border-blue-500/20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal animation="fade-up" duration={700}>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Ready to Partner with Us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-blue-100 font-medium">
                Submit your RFQ bill of materials today and receive comprehensive competitive pricing.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" duration={700} delay={150}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-blue-900/10 hover:-translate-y-0.5 transition-all font-bold">
                  <Link href="/contact">
                    Submit an RFQ Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                  <Link href="/products">
                    Browse Catalog
                  </Link>
                </Button>
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
