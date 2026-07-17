'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CATEGORIES } from '@/lib/types'
import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

  const getCategoryLabel = (val: string) => {
    for (const cat of CATEGORIES) {
      if (cat.value === val) return cat.label
      const sub = cat.subcategories?.find(s => s.value === val)
      if (sub) return sub.label
    }
    return val
  }

  const hasFilters = currentCategory || currentSearch
  const activeFiltersCount = [currentCategory, currentSearch].filter(Boolean).length

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search products by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-11 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-600 focus:ring-blue-100 focus:bg-white"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" disabled={isPending} className="h-11 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-blue-500/10">
          {isPending ? 'Searching...' : 'Search'}
        </Button>
        
        {/* Mobile filter toggle */}
        <Button
          type="button"
          variant="outline"
          className="h-11 lg:hidden relative border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </form>

      {/* Category filters - Desktop always visible, mobile collapsible */}
      <div className={cn(
        'transition-all duration-300 overflow-hidden',
        showFilters ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 lg:max-h-48 lg:opacity-100'
      )}>
        <div className="flex flex-wrap items-center gap-2 py-2">
          <span className="text-sm font-semibold text-slate-500 mr-2">Categories:</span>
          {CATEGORIES.map((category) => {
            const hasSub = !!category.subcategories
            const isMainActive = currentCategory === category.value || 
              (category.subcategories?.some(sub => sub.value === currentCategory) ?? false)

            if (hasSub) {
              return (
                <DropdownMenu key={category.value}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={isMainActive ? 'default' : 'outline'}
                      size="sm"
                      disabled={isPending}
                      className={cn(
                        'transition-all duration-200 font-semibold gap-1.5',
                        isMainActive 
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 border-blue-600 font-extrabold' 
                          : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                      )}
                    >
                      {category.label}
                      <span className="text-[9px] opacity-75">▼</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white border border-slate-200/80 rounded-xl shadow-lg p-1 z-50">
                    {category.subcategories?.map((sub) => (
                      <DropdownMenuItem
                        key={sub.value}
                        onClick={() => updateFilters(sub.value, currentSearch)}
                        className={cn(
                          "cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200",
                          currentCategory === sub.value
                            ? "bg-blue-50 text-blue-700 font-extrabold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {sub.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Button
                key={category.value}
                variant={currentCategory === category.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryClick(category.value)}
                disabled={isPending}
                className={cn(
                  'transition-all duration-200 font-semibold',
                  currentCategory === category.value 
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 border-blue-600 font-extrabold' 
                    : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                )}
              >
                {category.label}
              </Button>
            )
          })}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={isPending}
              className="text-slate-500 hover:text-rose-600 transition-colors"
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
          <span className="text-xs text-slate-500">Active:</span>
          {currentCategory && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs px-2.5 py-1 rounded-full font-medium">
              {getCategoryLabel(currentCategory)}
              <button onClick={() => handleCategoryClick(currentCategory)} className="hover:bg-blue-100 rounded-full p-0.5 ml-1">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {currentSearch && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs px-2.5 py-1 rounded-full font-medium">
              {`"${currentSearch}"`}
              <button onClick={() => { setSearchValue(''); updateFilters(currentCategory, undefined); }} className="hover:bg-blue-100 rounded-full p-0.5 ml-1">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
