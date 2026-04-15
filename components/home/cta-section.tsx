'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-float" />
            <div className="absolute -right-10 bottom-1/4 h-56 w-56 rounded-full bg-primary-foreground/10 blur-3xl animate-float stagger-3" />
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative text-center animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl text-balance">
              Need a Custom Quote?
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-primary-foreground/80">
              Contact us today for competitive pricing on bulk orders and customized industrial piping solutions.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 animate-fade-up stagger-1">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm w-full sm:w-auto">
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </a>
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-primary-foreground/70 animate-fade-up stagger-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">Or chat with us on WhatsApp for instant support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
