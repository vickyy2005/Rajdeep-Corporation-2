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
    bg: 'bg-blue-100', 
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  fittings: { 
    bg: 'bg-emerald-100', 
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  valves: { 
    bg: 'bg-amber-100', 
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  flanges: { 
    bg: 'bg-violet-100', 
    text: 'text-violet-700',
    border: 'border-violet-200',
  },
}

export function ProductCard({ product }: ProductCardProps) {
  const config = categoryConfig[product.category] || categoryConfig.pipes

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-secondary/50">
            <span className="text-5xl font-bold text-muted-foreground/20 transition-transform duration-300 group-hover:scale-110">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <Badge className={`absolute left-3 top-3 ${config.bg} ${config.text} ${config.border} border shadow-sm`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Badge>

        {product.featured && (
          <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground shadow-sm">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-semibold text-foreground line-clamp-1 text-base sm:text-lg group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 sm:p-5 pt-0">
        <Button 
          asChild 
          variant="outline" 
          className="w-full group/btn transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          <Link href={`/products/${product.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
