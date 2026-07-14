'use client'

import Link from 'next/link'
import { ArrowRight, Cylinder, Wrench, Gauge, CircleDot } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    name: 'Pipes',
    slug: 'pipes',
    description: 'High-grade mild steel, stainless steel, and galvanized iron pipes for critical industrial projects.',
    icon: Cylinder,
    gradient: 'from-blue-500/5 via-blue-500/2 to-transparent',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    hoverBorder: 'hover:border-blue-300 hover:shadow-blue-500/5',
  },
  {
    name: 'Fittings',
    slug: 'fittings',
    description: 'Butt-weld, socket-weld, and threaded elbow, tee, and reducer connections.',
    icon: Wrench,
    gradient: 'from-emerald-500/5 via-emerald-500/2 to-transparent',
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    hoverBorder: 'hover:border-emerald-300 hover:shadow-emerald-500/5',
  },
  {
    name: 'Valves',
    slug: 'valves',
    description: 'Heavy-duty gate, ball, butterfly, and check flow-control assemblies.',
    icon: Gauge,
    gradient: 'from-amber-500/5 via-amber-500/2 to-transparent',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    hoverBorder: 'hover:border-amber-300 hover:shadow-amber-500/5',
  },
  {
    name: 'Flanges',
    slug: 'flanges',
    description: 'Ansi/Asme blind, slip-on, and weld-neck flanges for pressure systems.',
    icon: CircleDot,
    gradient: 'from-violet-500/5 via-violet-500/2 to-transparent',
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100',
    hoverBorder: 'hover:border-violet-300 hover:shadow-violet-500/5',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-up">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our Product Categories
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-500 font-medium">
            Browse our comprehensive selection of industrial materials, built for reliability and certified standards.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              key={category.slug} 
              href={`/products?category=${category.slug}`}
              className={`animate-fade-up stagger-${index + 1}`}
            >
              <Card className={`group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 backdrop-blur-sm ${category.hoverBorder} border-2`}>
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg} transition-transform duration-300 group-hover:scale-105`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900 tracking-wide">{category.name}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    View Products
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
