'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Sparkles, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  'Premium Quality Products',
  'Competitive Pricing',
  'Fast Delivery',
  'Expert Support',
]

const stats = [
  { value: '500+', label: 'Products Catalog' },
  { value: '18+', label: 'Years of Trust' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '24/7', label: 'Inquiry Support' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 py-16 sm:py-24 lg:py-32 border-b border-slate-200/60">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl animate-float" />
        <div className="absolute -right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl animate-float stagger-3" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm0-24c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm0-24c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-24 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z' fill='%23000000' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left copy */}
          <div className="text-center lg:text-left lg:col-span-7">
            <div className="animate-fade-down inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-600 mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Leading industrial distributor in India</span>
            </div>

            <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
              Premium Quality
              <span className="block text-blue-600 mt-1">Industrial Piping Solutions</span>
            </h1>
            
            <p className="animate-fade-up stagger-1 mx-auto mt-6 max-w-xl text-base sm:text-lg text-slate-600 lg:mx-0 leading-relaxed font-medium">
              Rajdeep Corporation is your trusted partner for high-grade industrial pipes, fittings, valves, and flanges. Sourcing from certified manufacturers to deliver quality, durability, and performance.
            </p>

            <div className="animate-fade-up stagger-2 mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto font-bold">
                <Link href="/products">
                  Explore Products Catalog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 w-full sm:w-auto font-semibold">
                <Link href="/contact">
                  Request Instant Quote
                </Link>
              </Button>
            </div>

            <div className="animate-fade-up stagger-3 mt-10 grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:justify-start">
              {features.map((feature, index) => (
                <div 
                  key={feature} 
                  className={`flex items-center gap-2.5 text-slate-600 stagger-${index + 4}`}
                >
                  <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right graphics */}
          <div className="animate-scale-in stagger-2 lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-2xl backdrop-blur-sm">
                <img 
                  src="/images/hero-pipes-valves.png" 
                  alt="Industrial Pipes and Valves" 
                  className="rounded-xl w-full object-cover aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square shadow-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/10 via-transparent to-transparent rounded-xl" />
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -left-6 top-8 animate-float hidden sm:flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">ISO Certified</p>
                  <p className="text-[10px] text-slate-500 font-medium">100% Quality Assured</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -right-6 bottom-8 animate-float stagger-3 hidden sm:flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pan-India Delivery</p>
                  <p className="text-[10px] text-slate-500 font-medium">Fast & Secure Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats banner at the bottom of hero */}
        <div className="animate-fade-up stagger-4 mt-16 sm:mt-24 border-t border-slate-200/80 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
