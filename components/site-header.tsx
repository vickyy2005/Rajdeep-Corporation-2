'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200/80' 
        : 'bg-white border-b border-slate-200/80'
    )}>
      {/* Top bar - hidden on mobile */}
      <div className="hidden border-b border-slate-100 bg-slate-50 text-slate-600 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-xs font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+917021003269" className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
              <Phone className="h-3.5 w-3.5 text-slate-500" />
              <span>+91 70210 03269</span>
            </a>
            <a href="mailto:sales@rajdeepcorp.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
              <Mail className="h-3.5 w-3.5 text-slate-500" />
              <span>sales@rajdeepcorp.com</span>
            </a>
          </div>
          <div className="text-slate-500">
            Mon - Sat: 9:30 AM - 6:30 PM (IST)
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold text-lg shadow-md transition-transform duration-300 group-hover:scale-105">
            RC
          </div>
          <div>
            <div className="text-sm sm:text-base font-bold text-slate-900 tracking-wide leading-tight group-hover:text-blue-600 transition-colors">Rajdeep Corporation</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Industrial Piping Solutions</div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600 rounded-lg hover:bg-slate-50"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="ml-4 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 font-bold">
            <Link href="/contact">
              Request B2B Quote
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-200" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-200" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="space-y-1 px-4 pb-4 border-t border-slate-100 pt-4 bg-white">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full bg-blue-600 text-white hover:bg-blue-700 py-6 font-bold shadow-md">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Request Quote
              </Link>
            </Button>
          </div>
          
          {/* Mobile contact info */}
          <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
            <a href="tel:+917021003269" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors px-4 py-2">
              <Phone className="h-4 w-4" />
              <span>+91 70210 03269</span>
            </a>
            <a href="mailto:sales@rajdeepcorp.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors px-4 py-2">
              <Mail className="h-4 w-4" />
              <span>sales@rajdeepcorp.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
