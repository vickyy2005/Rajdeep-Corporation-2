'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Sparkles, ShieldCheck, Truck, Cpu, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ParticleBackground } from '@/components/particle-background'

const features = [
  'Premium Quality Products',
  'Competitive Pricing',
  'Fast Delivery',
  'Expert Support',
]

const stats = [
  { value: '500+', label: 'Products Catalog', detail: 'ANSI/ASME standard stock' },
  { value: '18+', label: 'Years of Trust', detail: 'Serving India since 2005' },
  { value: '1000+', label: 'Happy Clients', detail: 'Enterprise trust' },
  { value: '24/7', label: 'Inquiry Support', detail: 'Instant quote estimates' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full min-h-[650px] lg:min-h-[750px] flex items-center justify-center py-16 sm:py-20 border-b border-slate-900/50">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-pipes-valves.png" 
          alt="Industrial Pipes and Valves Background" 
          className="h-full w-full object-cover"
        />
        {/* Dark overlay with slight blur for high contrast */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]" />
        <ParticleBackground density={35} speedMultiplier={0.35} />
      </div>
      
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-1">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0v80h-80v-80h80zm-10 10h-60v60h60v-60z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center w-full my-auto">
        {/* Main centered content */}
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold text-blue-300 mb-6 shadow-md hover:border-blue-400/40 transition-all duration-300 animate-fade-down">
            <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-spin-slow" />
            <span>India's Leading Industrial Piping Supplier</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight animate-fade-up">
            High-Precision
            <span className="block bg-gradient-to-r from-blue-400 via-teal-300 to-blue-300 bg-clip-text text-transparent mt-1.5 font-black">
              Industrial Piping Solutions
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-medium animate-fade-up stagger-1">
            Rajdeep Corporation provides heavy-duty pipes, valves, fittings, and flanges certified for high-pressure systems, chemical processing, oil & gas, and infrastructure.
          </p>

          {/* Centered CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto animate-fade-up stagger-2">
            <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/30 font-bold px-8 rounded-xl h-14">
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 text-slate-200 bg-transparent hover:bg-white/10 hover:text-white backdrop-blur-sm px-8 rounded-xl h-14 font-semibold transition-all shadow-sm">
              <Link href="/contact">
                Request B2B Quote
              </Link>
            </Button>
          </div>

          {/* Centered Features horizontal layout */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 w-full border-t border-white/10 pt-8 animate-fade-up stagger-3">
            {features.map((feature) => (
              <div 
                key={feature} 
                className="flex items-center gap-2.5 text-slate-300 group cursor-default"
              >
                <CheckCircle className="h-4.5 w-4.5 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold group-hover:text-slate-100 transition-colors">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stats Section at the bottom */}
        <div className="mt-16 sm:mt-24 border-t border-white/10 pt-10 w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-xs hover:border-white/10 hover:bg-white/10 hover:shadow-lg transition-all duration-300 group cursor-default animate-scale-in"
                style={{ animationDelay: `${(idx * 100) + 400}ms` }}
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-teal-300 transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-[11px] font-extrabold text-slate-400 group-hover:text-slate-200 tracking-wider uppercase mt-1 transition-colors">
                  {stat.label}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 font-semibold text-center leading-normal">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
