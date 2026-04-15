'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { CATEGORIES, type Product } from '@/lib/types'

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.enum(['pipes', 'fittings', 'valves', 'flanges']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  is_active: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>(
    product?.specifications
      ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || 'pipes',
      description: product?.description || '',
      image_url: product?.image_url || '',
      is_active: product?.is_active ?? true,
    },
  })

  const isActive = watch('is_active')

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }])
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specifications]
    updated[index][field] = value
    setSpecifications(updated)
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)

    const specsObj = specifications
      .filter((s) => s.key.trim() && s.value.trim())
      .reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {})

    const payload = {
      ...data,
      image_url: data.image_url || null,
      specifications: specsObj,
    }

    try {
      const supabase = createClient()

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', product.id)

        if (error) throw error
        toast.success('Product updated successfully')
      } else {
        const { error } = await supabase.from('products').insert(payload)
        if (error) throw error
        toast.success('Product created successfully')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="SS 304 Seamless Pipe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                defaultValue={product?.category || 'pipes'}
                onValueChange={(value) => setValue('category', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter product description..."
              rows={4}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register('image_url')}
            />
            {errors.image_url && (
              <p className="text-sm text-destructive">{errors.image_url.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="is_active">Active Status</Label>
              <p className="text-sm text-muted-foreground">
                {isActive ? 'Product is visible on the website' : 'Product is hidden from the website'}
              </p>
            </div>
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) => setValue('is_active', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Specification name"
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSpecification(index)}
                disabled={specifications.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpecification}>
            <Plus className="mr-2 h-4 w-4" />
            Add Specification
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving...
            </>
          ) : product ? (
            'Update Product'
          ) : (
            'Create Product'
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
