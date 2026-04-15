import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product for your catalog</p>
      </div>

      <ProductForm />
    </div>
  )
}
