'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 border border-blue-500/20 shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-float" />
            <div className="absolute -right-10 bottom-1/4 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl animate-float stagger-3" />
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative text-center animate-fade-up">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Need a Custom B2B Quote?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-blue-100 font-medium">
              Submit your project bill of materials today. We offer competitive contract pricing for commercial building projects and bulk industrial orders.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up stagger-1">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto font-bold">
                <Link href="/contact">
                  Submit an RFQ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto font-semibold">
                <a href="tel:+917021003269">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Sales Desk
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-blue-200 animate-fade-up stagger-2">
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold">Or get instant stock checks on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
