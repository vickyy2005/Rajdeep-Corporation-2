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

const PRESET_IMAGES = [
  { label: 'Enter custom URL', value: 'custom' },
  { label: 'Mild Steel Pipe (MS) - Preset', value: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop' },
  { label: 'Galvanized Iron Pipe (GI) - Preset', value: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop' },
  { label: 'Stainless Steel Pipe (SS) - Preset', value: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&auto=format&fit=crop' },
  { label: 'Flanged Elbow Joint - Preset', value: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=800&auto=format&fit=crop' },
  { label: 'Industrial Gate Valve - Preset', value: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&auto=format&fit=crop' },
  { label: 'Brass Ball Valve - Preset', value: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&auto=format&fit=crop' },
  { label: 'Industrial Blind Flange - Preset', value: 'https://images.unsplash.com/photo-1542060748-10c28b629f6f?w=800&auto=format&fit=crop' },
]

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
  const imageUrl = watch('image_url')

  const presetMatch = PRESET_IMAGES.find(img => img.value === product?.image_url)
  const [selectedPreset, setSelectedPreset] = useState<string>(
    presetMatch ? presetMatch.value : (product?.image_url ? 'custom' : 'custom')
  )

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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Product Image Selection</Label>
              <Select
                value={selectedPreset}
                onValueChange={(value) => {
                  setSelectedPreset(value)
                  if (value !== 'custom') {
                    setValue('image_url', value)
                  } else if (!product?.image_url) {
                    setValue('image_url', '')
                  }
                }}
              >
                <SelectTrigger className="bg-white border-slate-200">
                  <SelectValue placeholder="Choose preset image" />
                </SelectTrigger>
                <SelectContent>
                  {PRESET_IMAGES.map((img) => (
                    <SelectItem key={img.value} value={img.value}>
                      {img.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register('image_url')}
                disabled={selectedPreset !== 'custom'}
                className="bg-white border-slate-200 disabled:bg-slate-50 disabled:text-slate-500"
              />
              {errors.image_url && (
                <p className="text-sm text-destructive">{errors.image_url.message}</p>
              )}
            </div>
          </div>

          {imageUrl && (
            <div className="mt-2 space-y-2">
              <Label>Live Preview</Label>
              <div className="relative aspect-video max-w-sm rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Live Product Preview"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLElement).style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

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
