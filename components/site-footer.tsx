import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const footerLinks = {
  products: [
    { name: 'Pipes', href: '/products?category=pipes' },
    { name: 'Fittings', href: '/products?category=fittings' },
    { name: 'Valves', href: '/products?category=valves' },
    { name: 'Flanges', href: '/products?category=flanges' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Request Quote', href: '/contact' },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold text-lg transition-transform hover:scale-105">
                RC
              </div>
              <div>
                <div className="text-lg font-semibold">Rajdeep Corporation</div>
                <div className="text-xs text-primary-foreground/70">Industrial Piping Solutions</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
              Your trusted partner for quality industrial pipes, fittings, valves, and flanges. 
              Serving industries across India since 2005.
            </p>
            
            {/* Social/Trust badges */}
            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                18+ Years Trusted
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-accent text-sm uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-accent text-sm uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-accent text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+917021003269"
                  className="group flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>+91 70210 03269</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rajdeepcorp.com"
                  className="group flex items-center gap-2.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10 group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>info@rajdeepcorp.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/80">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10 shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="pt-1.5">Industrial Area, Phase-2,<br />Mumbai, Maharashtra 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t border-primary-foreground/20 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Rajdeep Corporation. All rights reserved.</p>
          <p className="text-xs">Quality products. Competitive prices. Trusted service.</p>
        </div>
      </div>
    </footer>
  )
}
