'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Outer Glow container */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-14 sm:px-16 sm:py-20 lg:px-20 lg:py-24 border border-slate-900 shadow-2xl">
          
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/5 blur-[80px]" />
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-indigo-500/5 blur-[80px]" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h-30v-30h30zm-10 10h-10v10h10v-10z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative text-center animate-fade-up max-w-3xl mx-auto">
            {/* Tag label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3.5 py-1 text-[11px] font-extrabold text-cyan-400 tracking-wider uppercase mb-5">
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>B2B Contract Pricing</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Need a Custom, Bulk-Order B2B Quote?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed">
              Submit your Bill of Materials (BOM) or project drawings. We provide competitive wholesale contracts, project supply agreements, and custom fabrication quotes within 24 hours.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 font-bold rounded-xl h-13 px-8 w-full sm:w-auto border-none">
                <Link href="/contact">
                  Submit an RFQ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-800 text-slate-300 bg-transparent hover:bg-slate-900/60 hover:text-white backdrop-blur-sm rounded-xl h-13 px-8 w-full sm:w-auto font-semibold transition-all">
                <a href="tel:+917021003269">
                  <Phone className="mr-2 h-4.5 w-4.5" />
                  Call Sales Office
                </a>
              </Button>
            </div>

            {/* Instant whatsapp helper label */}
            <div className="mt-8 flex items-center justify-center gap-2.5 text-slate-400 cursor-default hover:text-slate-300 transition-colors">
              <MessageCircle className="h-5 w-5 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold">Get instant stock checks on WhatsApp at +91 70210 03269</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
