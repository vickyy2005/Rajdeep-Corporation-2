'use client'

import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

const categoryConfig = {
  pipes: { 
    bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', 
  },
  fittings: { 
    bg: 'bg-teal-50 text-teal-700 border-teal-200', 
  },
  valves: { 
    bg: 'bg-blue-50 text-blue-700 border-blue-200', 
  },
  flanges: { 
    bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const config = categoryConfig[product.category] || categoryConfig.pipes

  return (
    <Card className="group h-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 border border-slate-200 bg-white hover:border-blue-300 shadow-sm flex flex-col justify-between rounded-2xl">
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
          <Badge className={`absolute left-3 top-3 ${config.bg} border shadow-md font-extrabold text-[10px] py-0.5 px-2.5 rounded-md uppercase tracking-wider`}>
            {product.category}
          </Badge>

          {product.featured && (
            <Badge className="absolute right-3 top-3 bg-blue-600 text-white shadow-md font-extrabold text-[10px] py-0.5 px-2.5 rounded-md border border-blue-500 uppercase tracking-wider">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Text Details */}
        <CardContent className="p-5">
          <h3 className="font-extrabold text-slate-900 line-clamp-1 text-base sm:text-lg group-hover:text-blue-600 transition-colors duration-300">
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
          className="w-full group/btn transition-all duration-300 border-slate-200 text-slate-700 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold rounded-xl h-11 shadow-sm"
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
