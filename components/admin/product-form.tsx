'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus, X, UploadCloud, Trash2 } from 'lucide-react'
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
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image_url: z.string().optional().or(z.literal('')),
  is_active: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

const SELECTABLE_CATEGORIES = CATEGORIES.flatMap(cat => {
  if (cat.subcategories) {
    return cat.subcategories.map(sub => ({
      value: sub.value,
      label: sub.value === cat.value ? `${cat.label} (Generic)` : `${cat.label} → ${sub.label}`
    }))
  }
  return [{ value: cat.value, label: cat.label }]
})

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

  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>(
    product?.image_url && !PRESET_IMAGES.some(img => img.value === product.image_url) && !product.image_url.startsWith('data:')
      ? 'url'
      : 'upload'
  )

  const uploadBlob = async (file: File) => {
    try {
      const supabase = createClient()
      
      if (!supabase.storage) {
        // Fallback to base64 for offline/mock database
        const reader = new FileReader()
        reader.onload = () => {
          setValue('image_url', reader.result as string)
          toast.success('Image loaded (local database mode)')
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
        return
      }

      const fileExt = file.name.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `products/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.warn('Supabase storage upload failed, falling back to base64:', uploadError)
        // Fallback to base64
        const reader = new FileReader()
        reader.onload = () => {
          setValue('image_url', reader.result as string)
          toast.success('Image loaded (local database fallback)')
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setValue('image_url', publicUrl)
      toast.success('Image uploaded successfully')
    } catch (err) {
      console.error('Upload error:', err)
      const reader = new FileReader()
      reader.onload = () => {
        setValue('image_url', reader.result as string)
        toast.success('Image loaded (local fallback)')
      }
      reader.readAsDataURL(file)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    setIsUploading(true)
    
    // Read the file and compress it using canvas
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = async () => {
        const canvas = document.createElement('canvas')
        const maxDimensions = 800
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxDimensions) {
            height = Math.round((height * maxDimensions) / width)
            width = maxDimensions
          }
        } else {
          if (height > maxDimensions) {
            width = Math.round((width * maxDimensions) / height)
            height = maxDimensions
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                await uploadBlob(file)
                return
              }
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              await uploadBlob(compressedFile)
            },
            'image/jpeg',
            0.8
          )
        } else {
          await uploadBlob(file)
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

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
        const baseSlug = data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
        const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`

        const { error } = await supabase.from('products').insert({
          ...payload,
          id: uniqueSlug,
        })
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
                  {SELECTABLE_CATEGORIES.map((cat) => (
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

          {/* Image Mode Tabs */}
          <div className="space-y-2">
            <Label>Product Image Source</Label>
            <div className="flex space-x-1 rounded-lg bg-slate-100 p-1 w-fit mb-4">
              <button
                type="button"
                onClick={() => setUploadMode('upload')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  uploadMode === 'upload'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  uploadMode === 'url'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Choose Preset / URL
              </button>
            </div>
          </div>

          {uploadMode === 'upload' ? (
            <div className="space-y-2">
              {imageUrl ? (
                <div className="relative group aspect-video max-w-md rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const fileInput = document.getElementById('image-upload-input')
                        fileInput?.click()
                      }}
                      className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-50 transition-colors"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setValue('image_url', '')
                      }}
                      className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setIsDragging(false)
                    const files = e.dataTransfer.files
                    if (files && files[0]) {
                      handleFile(files[0])
                    }
                  }}
                  onClick={() => {
                    const fileInput = document.getElementById('image-upload-input')
                    fileInput?.click()
                  }}
                  className={`aspect-video max-w-md rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files[0]) {
                        handleFile(files[0])
                      }
                    }}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Spinner className="h-8 w-8 text-blue-500" />
                      <p className="text-sm font-medium text-slate-600">Uploading image...</p>
                    </div>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                        <UploadCloud className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">
                        Drag and drop image here, or <span className="text-blue-600 hover:underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, JPEG up to 5MB</p>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
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
                    type="text"
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
                <div className="space-y-2">
                  <Label>Live Preview</Label>
                  <div className="relative aspect-video max-w-md rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
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
