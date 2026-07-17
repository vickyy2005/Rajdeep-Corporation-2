'use client'

import Link from 'next/link'
import { ArrowRight, Cylinder, Wrench, Gauge, CircleDot, Layers } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ScrollReveal } from '@/components/scroll-reveal'

const categories = [
  {
    name: 'Industrial Pipes',
    slug: 'pipes',
    description: 'High-grade mild steel, stainless steel, and galvanized iron pipes engineered for high pressure and chemical resistance.',
    icon: Cylinder,
    spec: 'ASTM / ASME standards',
    iconBg: 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20',
    gradientBorder: 'from-cyan-400 to-blue-500',
    textHover: 'group-hover:text-cyan-600',
    arrowHover: 'group-hover:bg-cyan-600 group-hover:border-cyan-600',
  },
  {
    name: 'Precision Fittings',
    slug: 'fittings',
    description: 'Forged butt-weld, socket-weld, and threaded fittings. Elbows, tees, couplings, and reducers for leak-proof joints.',
    icon: Wrench,
    spec: 'Size 1/2" to 48" IPS',
    iconBg: 'bg-teal-500/10 text-teal-600 border border-teal-500/20',
    gradientBorder: 'from-teal-400 to-emerald-500',
    textHover: 'group-hover:text-teal-600',
    arrowHover: 'group-hover:bg-teal-600 group-hover:border-teal-600',
  },
  {
    name: 'Flow Control Valves',
    slug: 'valves',
    description: 'Heavy-duty flow isolation and control gate, globe, ball, butterfly, and check valves built to withstand extreme temperatures.',
    icon: Gauge,
    spec: 'Class 150 to 2500 pressure',
    iconBg: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
    gradientBorder: 'from-blue-400 to-indigo-500',
    textHover: 'group-hover:text-blue-600',
    arrowHover: 'group-hover:bg-blue-600 group-hover:border-blue-600',
  },
  {
    name: 'Other Categories',
    slug: 'other',
    description: 'Industrial sealing rings, standard flanges, and Woltman water flow meters designed for comprehensive pipelines.',
    icon: Layers,
    spec: 'Ring, Flanges, Water Meter',
    iconBg: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20',
    gradientBorder: 'from-indigo-400 to-purple-500',
    textHover: 'group-hover:text-indigo-600',
    arrowHover: 'group-hover:bg-indigo-600 group-hover:border-indigo-600',
  },
]

export function CategoriesSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-transparent border-t border-slate-100/50 overflow-hidden">
      {/* Decorative blurred glow elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-12 left-1/4 w-[350px] h-[350px] bg-blue-300/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-12 right-1/4 w-[350px] h-[350px] bg-indigo-300/20 rounded-full blur-[120px]" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v30h-30v-30h30zm-10 10h-10v10h10v-10z' fill='%230f172a' fill-opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Block */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3.5 py-1 text-[11px] font-extrabold text-blue-700 tracking-wider uppercase mb-4 shadow-xs">
              <Layers className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              <span>Industrial Inventory</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Our Core <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Product Categories</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Discover our robust selection of materials and piping connections designed for absolute reliability and engineering accuracy.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <ScrollReveal 
              key={category.slug} 
              animation="fade-up" 
              delay={index * 100}
              duration={600}
            >
              <Link 
                href={`/products?category=${category.slug}`}
                className="group block h-full hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-full rounded-2xl p-[1.5px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/40 transition-shadow duration-500">
                  {/* Default Border Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200/80 to-slate-200/30" />
                  
                  {/* Hover Border Gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    category.gradientBorder
                  )} />
                  
                  {/* Inner Card Container */}
                  <Card className="relative h-full w-full rounded-[14.5px] border-none bg-white/70 backdrop-blur-md z-10 shadow-none">
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                      <div>
                        {/* Floating Icon Box */}
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                            category.iconBg
                          )}>
                            <category.icon className="h-5.5 w-5.5" />
                          </div>
                          <span className={cn(
                            "text-[9px] font-bold tracking-widest text-slate-500 transition-colors uppercase bg-slate-50/50 px-2 py-0.5 rounded-md border border-slate-200/60",
                            category.textHover
                          )}>
                            {category.spec}
                          </span>
                        </div>
                        
                        <h3 className={cn(
                          "mt-6 text-lg font-black text-slate-900 tracking-wide transition-colors",
                          category.textHover
                        )}>
                          {category.name}
                        </h3>
                        <p className="mt-3.5 text-xs text-slate-600 leading-relaxed font-semibold">
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Footer view link */}
                      <div className={cn(
                        "mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500 transition-all duration-300",
                        category.textHover
                      )}>
                        <span>View Specifications</span>
                        <div className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 border border-slate-200 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5",
                          category.arrowHover
                        )}>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
