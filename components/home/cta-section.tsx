'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-transparent border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 border border-slate-800 shadow-sm">
          
          {/* Subtle light effect at top/left, very professional */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
          </div>
          
          <div className="relative text-center max-w-2xl mx-auto">
            {/* Tag label */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-300 mb-6">
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>B2B Contract Pricing</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Need a Custom, Bulk-Order B2B Quote?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Submit your Bill of Materials (BOM) or project drawings. We provide competitive wholesale contracts, project supply agreements, and custom fabrication quotes within 24 hours.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-lg px-6 h-11 w-full sm:w-auto transition-colors">
                <Link href="/contact">
                  Submit an RFQ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800 hover:text-white rounded-lg px-6 h-11 w-full sm:w-auto font-medium transition-colors">
                <a href="tel:+917021003269">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Sales Office
                </a>
              </Button>
            </div>

            {/* WhatsApp Helper */}
            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-xs">
              <MessageCircle className="h-4.5 w-4.5 text-emerald-500" />
              <span>
                Get instant stock checks on WhatsApp at{' '}
                <a 
                  href="https://wa.me/917021003269" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-slate-300 hover:underline hover:text-white transition-colors"
                >
                  +91 70210 03269
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

