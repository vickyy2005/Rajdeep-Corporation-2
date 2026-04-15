'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CATEGORIES } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  currentCategory?: string
  currentSearch?: string
}

export function ProductFilters({ currentCategory, currentSearch }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(currentSearch || '')
  const [showFilters, setShowFilters] = useState(false)

  const updateFilters = (category?: string, search?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`)
    })
  }

  const handleCategoryClick = (category: string) => {
    const newCategory = category === currentCategory ? undefined : category
    updateFilters(newCategory, currentSearch)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters(currentCategory, searchValue || undefined)
  }

  const clearFilters = () => {
    setSearchValue('')
    startTransition(() => {
      router.push('/products')
    })
  }

  const hasFilters = currentCategory || currentSearch
  const activeFiltersCount = [currentCategory, currentSearch].filter(Boolean).length

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="h-11 px-6 transition-all duration-200">
          {isPending ? 'Searching...' : 'Search'}
        </Button>
        
        {/* Mobile filter toggle */}
        <Button
          type="button"
          variant="outline"
          className="h-11 lg:hidden relative"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </form>

      {/* Category filters - Desktop always visible, mobile collapsible */}
      <div className={cn(
        'transition-all duration-300 overflow-hidden',
        showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 lg:max-h-40 lg:opacity-100'
      )}>
        <div className="flex flex-wrap items-center gap-2 py-2">
          <span className="text-sm font-medium text-muted-foreground mr-1">Categories:</span>
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={currentCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryClick(category.value)}
              disabled={isPending}
              className={cn(
                'transition-all duration-200',
                currentCategory === category.value 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted hover:border-primary/30'
              )}
            >
              {category.label}
            </Button>
          ))}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={isPending}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="mr-1 h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Active filters summary on mobile */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 lg:hidden animate-fade-in">
          <span className="text-xs text-muted-foreground">Active:</span>
          {currentCategory && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {currentCategory}
              <button onClick={() => handleCategoryClick(currentCategory)} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {currentSearch && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {`"${currentSearch}"`}
              <button onClick={() => { setSearchValue(''); updateFilters(currentCategory, undefined); }} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
