import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, Building2, Package, Calendar, MessageSquare } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RfqStatusUpdate } from '@/components/admin/rfq-status-update'
import type { RFQRequest } from '@/lib/types'

interface RfqDetailPageProps {
  params: Promise<{ id: string }>
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  reviewed: 'bg-blue-100 text-blue-800',
  quoted: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

export default async function RfqDetailPage({ params }: RfqDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: request, error } = await supabase
    .from('rfq_requests')
    .select('*, product:products(*)')
    .eq('id', id)
    .single()

  if (error || !request) {
    notFound()
  }

  const typedRequest = request as RFQRequest & { product: any }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link 
          href="/admin/rfq" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quote Requests
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Quote Request</h1>
          <Badge className={statusColors[typedRequest.status]}>
            {typedRequest.status.charAt(0).toUpperCase() + typedRequest.status.slice(1)}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Submitted on {new Date(typedRequest.created_at).toLocaleDateString()} at{' '}
          {new Date(typedRequest.created_at).toLocaleTimeString()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{typedRequest.customer_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${typedRequest.customer_email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {typedRequest.customer_email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${typedRequest.customer_phone}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {typedRequest.customer_phone}
                  </a>
                </div>
              </div>

              {typedRequest.company_name && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium text-foreground">{typedRequest.company_name}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Info */}
          {typedRequest.product && (
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {typedRequest.product.image_url ? (
                      <img
                        src={typedRequest.product.image_url}
                        alt={typedRequest.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{typedRequest.product.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {typedRequest.product.category}
                    </p>
                    {typedRequest.quantity && (
                      <p className="mt-1 text-sm">
                        <span className="text-muted-foreground">Quantity: </span>
                        <span className="font-medium">{typedRequest.quantity}</span>
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-foreground">{typedRequest.message}</p>
            </CardContent>
          </Card>
        </div>

        {/* Status & Actions */}
        <div className="space-y-6">
          <RfqStatusUpdate 
            rfqId={typedRequest.id} 
            currentStatus={typedRequest.status}
            currentNotes={typedRequest.admin_notes}
          />
        </div>
      </div>
    </div>
  )
}
