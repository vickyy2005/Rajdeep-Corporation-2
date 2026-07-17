'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

const categoryConfig = {
  pipes: { 
    bg: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20', 
    hoverBorder: 'hover:border-cyan-300 hover:shadow-cyan-500/10',
    textHover: 'group-hover:text-cyan-600',
    btnHover: 'hover:bg-cyan-600 hover:border-cyan-600 hover:text-white',
  },
  fittings: { 
    bg: 'bg-teal-500/10 text-teal-600 border-teal-500/20', 
    hoverBorder: 'hover:border-teal-300 hover:shadow-teal-500/10',
    textHover: 'group-hover:text-teal-600',
    btnHover: 'hover:bg-teal-600 hover:border-teal-600 hover:text-white',
  },
  valves: { 
    bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20', 
    hoverBorder: 'hover:border-blue-300 hover:shadow-blue-500/10',
    textHover: 'group-hover:text-blue-600',
    btnHover: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white',
  },
  flanges: { 
    bg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', 
    hoverBorder: 'hover:border-indigo-300 hover:shadow-indigo-500/10',
    textHover: 'group-hover:text-indigo-600',
    btnHover: 'hover:bg-indigo-600 hover:border-indigo-600 hover:text-white',
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const config = categoryConfig[product.category] || categoryConfig.pipes

  return (
    <Card className={cn(
      "group h-full overflow-hidden transition-all duration-500 hover:-translate-y-1.5 border border-slate-200/80 bg-white/70 backdrop-blur-md hover:shadow-2xl hover:shadow-slate-200/50 shadow-sm flex flex-col justify-between rounded-2xl",
      config.hoverBorder
    )}>
      <div>
        {/* Image / Placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200/60">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 opacity-40 animate-pulse duration-300" />
              <span className="text-4xl font-black text-slate-300 transition-transform duration-500 group-hover:scale-110 select-none tracking-widest">
                {product.name.split(' ').map(word => word[0]).slice(0, 2).join('')}
              </span>
            </div>
          )}
          
          {/* Badges */}
          <Badge className={cn(
            "absolute left-3 top-3 border shadow-sm font-extrabold text-[10px] py-0.5 px-2.5 rounded-md uppercase tracking-wider",
            config.bg
          )}>
            {product.category}
          </Badge>

          {product.featured && (
            <Badge className="absolute right-3 top-3 bg-blue-600 text-white shadow-sm font-extrabold text-[10px] py-0.5 px-2.5 rounded-md border border-blue-500 uppercase tracking-wider">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Text Details */}
        <CardContent className="p-5">
          <h3 className={cn(
            "font-extrabold text-slate-900 line-clamp-1 text-base sm:text-lg transition-colors duration-300",
            config.textHover
          )}>
            {product.name}
          </h3>
          <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed font-semibold">
            {product.description}
          </p>
        </CardContent>
      </div>
      
      {/* Action Footer */}
      <CardFooter className="p-5 pt-0">
        <Button 
          asChild 
          variant="outline" 
          className={cn(
            "w-full group/btn transition-all duration-300 border-slate-200 text-slate-700 bg-white font-bold rounded-xl h-11 shadow-xs",
            config.btnHover
          )}
        >
          <Link href={`/products/${product.id}`}>
            View Specifications
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
