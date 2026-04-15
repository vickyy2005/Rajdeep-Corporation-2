'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  'Premium Quality Products',
  'Competitive Pricing',
  'Fast Delivery',
  'Expert Support',
]

const stats = [
  { value: '500+', label: 'Products' },
  { value: '18+', label: 'Years Experience' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 lg:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute -right-4 bottom-1/4 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl animate-float stagger-3" />
        <div className="absolute left-1/3 top-1/2 h-48 w-48 rounded-full bg-accent/5 blur-2xl animate-float stagger-5" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="animate-fade-down inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Trusted by 1000+ businesses</span>
            </div>

            <h1 className="animate-fade-up text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block text-balance">Your Trusted Partner in</span>
              <span className="block text-accent mt-2">Industrial Piping Solutions</span>
            </h1>
            
            <p className="animate-fade-up stagger-1 mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-primary-foreground/80 lg:mx-0 leading-relaxed">
              Rajdeep Corporation supplies premium quality pipes, fittings, valves, and flanges 
              to industries across India. Quality you can trust, prices you&apos;ll appreciate.
            </p>

            <div className="animate-fade-up stagger-2 mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground backdrop-blur-sm w-full sm:w-auto">
                <Link href="/contact">
                  Get a Quote
                </Link>
              </Button>
            </div>

            <div className="animate-fade-up stagger-3 mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-wrap lg:justify-start">
              {features.map((feature, index) => (
                <div 
                  key={feature} 
                  className={`flex items-center gap-2 text-primary-foreground/90 stagger-${index + 4}`}
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                  <span className="text-xs sm:text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid - visible on all screens */}
          <div className="animate-scale-in stagger-2 mt-8 lg:mt-0">
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl bg-primary-foreground/10 backdrop-blur-sm p-4 sm:p-6 lg:p-8 border border-primary-foreground/10">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-end transition-all duration-300 hover:scale-105 ${
                        index % 2 === 0 ? 'bg-primary-foreground/20' : 'bg-accent/20'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground">{stat.value}</span>
                      <span className="text-xs sm:text-sm text-primary-foreground/70 mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/30 blur-2xl hidden lg:block" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
