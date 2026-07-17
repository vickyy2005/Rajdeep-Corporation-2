'use client'

import Link from 'next/link'
import { ArrowRight, Cylinder, Wrench, Gauge, CircleDot, Layers } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    name: 'Industrial Pipes',
    slug: 'pipes',
    description: 'High-grade mild steel, stainless steel, and galvanized iron pipes engineered for high pressure and chemical resistance.',
    icon: Cylinder,
    spec: 'ASTM / ASME standards',
    iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    hoverBorder: 'hover:border-cyan-300 hover:shadow-cyan-500/5',
  },
  {
    name: 'Precision Fittings',
    slug: 'fittings',
    description: 'Forged butt-weld, socket-weld, and threaded fittings. Elbows, tees, couplings, and reducers for leak-proof joints.',
    icon: Wrench,
    spec: 'Size 1/2" to 48" IPS',
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    hoverBorder: 'hover:border-teal-300 hover:shadow-teal-500/5',
  },
  {
    name: 'Flow Control Valves',
    slug: 'valves',
    description: 'Heavy-duty flow isolation and control gate, globe, ball, butterfly, and check valves built to withstand extreme temperatures.',
    icon: Gauge,
    spec: 'Class 150 to 2500 pressure',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    hoverBorder: 'hover:border-blue-300 hover:shadow-blue-500/5',
  },
  {
    name: 'Standard Flanges',
    slug: 'flanges',
    description: 'ASME/ANSI blind, slip-on, weld-neck, and threaded flanges designed for robust flange joints and easy line maintenance.',
    icon: CircleDot,
    spec: 'FF, RF, RTJ faces available',
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    hoverBorder: 'hover:border-indigo-300 hover:shadow-indigo-500/5',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-[11px] font-extrabold text-indigo-700 tracking-wider uppercase mb-4">
            <Layers className="h-3.5 w-3.5 text-indigo-600" />
            <span>Industrial Inventory</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our Core Product Categories
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Discover our robust selection of materials and piping connections designed for absolute reliability and engineering accuracy.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              key={category.slug} 
              href={`/products?category=${category.slug}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className={`h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 bg-white hover:bg-slate-50/50 hover:shadow-xl ${category.hoverBorder}`}>
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div>
                    {/* Floating Icon Box */}
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <category.icon className="h-5.5 w-5.5" />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-slate-500 group-hover:text-blue-600 transition-colors uppercase bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                        {category.spec}
                      </span>
                    </div>
                    
                    <h3 className="mt-6 text-lg font-black text-slate-900 tracking-wide group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-3.5 text-xs text-slate-600 leading-relaxed font-semibold">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Footer view link */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-all duration-300">
                    <span>View Specifications</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 border border-slate-200 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
