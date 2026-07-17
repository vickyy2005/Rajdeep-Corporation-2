import Link from 'next/link'
import Image from 'next/image'
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
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Rajdeep Corporation Logo"
                width={72}
                height={72}
                className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-contain transition-transform hover:scale-105"
              />
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide leading-tight">
                  Rajdeep Corporation
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  Industrial Piping Solutions
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Your trusted B2B partner for high-grade industrial pipes, fittings, valves, and flanges. 
              Serving infrastructure, power, oil, and gas projects across India since 2005.
            </p>
            
            {/* Social/Trust badges */}
            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                18+ Years Trusted
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-accent text-xs uppercase tracking-widest">Products</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
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
            <h3 className="font-bold text-accent text-xs uppercase tracking-widest">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
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
            <h3 className="font-bold text-accent text-xs uppercase tracking-widest">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+917021003269"
                  className="group flex items-center gap-3 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 group-hover:bg-accent/20 transition-colors">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>+91 70210 03269</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@rajdeepcorp.com"
                  className="group flex items-center gap-3 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>sales@rajdeepcorp.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="pt-0.5">Office 302, Steel Market Chamber<br />Loha Bhavan, Kalamboli, Navi Mumbai<br />Maharashtra, India - 410218</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Rajdeep Corporation. All rights reserved.</p>
          <p>ISO 9001:2015 B2B Industrial Piping Distributor.</p>
        </div>
      </div>
    </footer>
  )
}
