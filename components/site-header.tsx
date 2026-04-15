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
        ? 'bg-background/95 backdrop-blur-lg shadow-sm border-b border-border' 
        : 'bg-background border-b border-border'
    )}>
      {/* Top bar - hidden on mobile */}
      <div className="hidden border-b border-border bg-primary text-primary-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+917021003269" className="flex items-center gap-2 hover:text-accent transition-colors duration-200">
              <Phone className="h-4 w-4" />
              <span>+91 70210 03269</span>
            </a>
            <a href="mailto:info@rajdeepcorp.com" className="flex items-center gap-2 hover:text-accent transition-colors duration-200">
              <Mail className="h-4 w-4" />
              <span>info@rajdeepcorp.com</span>
            </a>
          </div>
          <div className="text-primary-foreground/80">
            Mon - Sat: 9:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base sm:text-lg transition-transform duration-300 group-hover:scale-105">
            RC
          </div>
          <div className="hidden xs:block sm:block">
            <div className="text-base sm:text-lg font-semibold text-foreground">Rajdeep Corporation</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Industrial Piping Solutions</div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary rounded-lg hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="ml-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <Link href="/contact">
              Request Quote
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
        <div className="space-y-1 px-4 pb-4 border-t border-border pt-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Request Quote
              </Link>
            </Button>
          </div>
          
          {/* Mobile contact info */}
          <div className="pt-4 mt-2 border-t border-border space-y-2">
            <a href="tel:+917021003269" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              <Phone className="h-4 w-4" />
              <span>+91 70210 03269</span>
            </a>
            <a href="mailto:info@rajdeepcorp.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              <Mail className="h-4 w-4" />
              <span>info@rajdeepcorp.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
