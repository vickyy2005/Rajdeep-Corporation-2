import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ProductForm } from '@/components/admin/product-form'
import type { Product } from '@/lib/types'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link 
          href="/admin/products" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Product</h1>
        <p className="text-muted-foreground">Update product details</p>
      </div>

      <ProductForm product={product as Product} />
    </div>
  )
}
