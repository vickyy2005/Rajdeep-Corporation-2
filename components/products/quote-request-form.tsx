'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

const quoteSchema = z.object({
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_email: z.string().email('Please enter a valid email address'),
  customer_phone: z.string().min(10, 'Please enter a valid phone number'),
  company_name: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface QuoteRequestFormProps {
  productId?: string
  productName?: string
}

export function QuoteRequestForm({ productId, productName }: QuoteRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      message: productName ? `I am interested in ${productName}. Please provide pricing and availability details.` : '',
    },
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          product_id: productId || null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      setIsSuccess(true)
      reset()
      toast.success('Quote request submitted successfully!')
    } catch {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800">Thank You!</h3>
        <p className="mt-2 text-green-700">
          Your quote request has been submitted. Our team will contact you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => setIsSuccess(false)}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customer_name">Full Name *</Label>
          <Input
            id="customer_name"
            placeholder="John Doe"
            {...register('customer_name')}
            aria-invalid={errors.customer_name ? 'true' : 'false'}
          />
          {errors.customer_name && (
            <p className="text-sm text-destructive">{errors.customer_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer_email">Email Address *</Label>
          <Input
            id="customer_email"
            type="email"
            placeholder="john@company.com"
            {...register('customer_email')}
            aria-invalid={errors.customer_email ? 'true' : 'false'}
          />
          {errors.customer_email && (
            <p className="text-sm text-destructive">{errors.customer_email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer_phone">Phone Number *</Label>
          <Input
            id="customer_phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register('customer_phone')}
            aria-invalid={errors.customer_phone ? 'true' : 'false'}
          />
          {errors.customer_phone && (
            <p className="text-sm text-destructive">{errors.customer_phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            placeholder="ABC Industries"
            {...register('company_name')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity Required</Label>
          <Input
            id="quantity"
            placeholder="e.g., 100 pieces, 500 meters"
            {...register('quantity')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Please describe your requirements..."
          rows={4}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Submitting...
          </>
        ) : (
          'Submit Quote Request'
        )}
      </Button>
    </form>
  )
}
