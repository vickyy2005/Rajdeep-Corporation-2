'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

const categoryConfig = {
  pipes: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-700',
    border: 'border-blue-100',
  },
  fittings: { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-700',
    border: 'border-emerald-100',
  },
  valves: { 
    bg: 'bg-amber-50', 
    text: 'text-amber-700',
    border: 'border-amber-100',
  },
  flanges: { 
    bg: 'bg-violet-50', 
    text: 'text-violet-700',
    border: 'border-violet-100',
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const config = categoryConfig[product.category] || categoryConfig.pipes

  return (
    <Card className="group h-full overflow-hidden transition-all duration-350 hover:shadow-xl hover:-translate-y-1 bg-white border-slate-200 hover:border-slate-300 shadow-md flex flex-col justify-between">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border-b border-slate-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-30" />
              <span className="text-5xl font-extrabold text-slate-300 transition-transform duration-300 group-hover:scale-105 select-none tracking-wider">
                {product.name.split(' ').map(word => word[0]).slice(0, 2).join('')}
              </span>
            </div>
          )}
          
          <Badge className={`absolute left-3 top-3 ${config.bg} ${config.text} ${config.border} border shadow-sm font-semibold text-xs py-0.5 px-2.5 rounded-md`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>

          {product.featured && (
            <Badge className="absolute right-3 top-3 bg-blue-600 text-white shadow-sm font-semibold text-xs py-0.5 px-2.5 rounded-md border border-blue-650">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-bold text-slate-900 line-clamp-1 text-base sm:text-lg group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </CardContent>
      </div>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          asChild 
          variant="outline" 
          className="w-full group/btn transition-all duration-300 border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold"
        >
          <Link href={`/products/${product.id}`}>
            View Specifications
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
