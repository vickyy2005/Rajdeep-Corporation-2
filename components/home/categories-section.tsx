'use client'

import Link from 'next/link'
import { ArrowRight, Cylinder, Wrench, Gauge, CircleDot } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    name: 'Pipes',
    slug: 'pipes',
    description: 'High-quality industrial pipes in various materials including SS, MS, GI, and more.',
    icon: Cylinder,
    gradient: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-100 text-blue-600',
    hoverBorder: 'hover:border-blue-200',
  },
  {
    name: 'Fittings',
    slug: 'fittings',
    description: 'Precision-engineered fittings for secure and leak-proof connections.',
    icon: Wrench,
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'bg-emerald-100 text-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
  },
  {
    name: 'Valves',
    slug: 'valves',
    description: 'Reliable valves for flow control in industrial applications.',
    icon: Gauge,
    gradient: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-100 text-amber-600',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    name: 'Flanges',
    slug: 'flanges',
    description: 'Durable flanges for pipe connections in high-pressure environments.',
    icon: CircleDot,
    gradient: 'from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-100 text-violet-600',
    hoverBorder: 'hover:border-violet-200',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
            Our Product Categories
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Explore our comprehensive range of industrial piping products
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              key={category.slug} 
              href={`/products?category=${category.slug}`}
              className={`animate-fade-up stagger-${index + 1}`}
            >
              <Card className={`group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${category.hoverBorder} border-2 border-transparent`}>
                <CardContent className={`p-5 sm:p-6 bg-gradient-to-br ${category.gradient} rounded-lg`}>
                  <div className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${category.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <category.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold text-foreground">{category.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
                    View Products
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
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
