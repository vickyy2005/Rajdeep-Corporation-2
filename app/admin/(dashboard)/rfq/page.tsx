import { createClient } from '@/utils/supabase/server'
import { RfqTable } from '@/components/admin/rfq-table'
import type { RFQRequest } from '@/lib/types'

interface RfqPageProps {
  searchParams: Promise<{ status?: string }>
}

export default async function AdminRfqPage({ searchParams }: RfqPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('rfq_requests')
    .select('*, product:products(name)')
    .order('created_at', { ascending: false })

  if (params.status && ['pending', 'reviewed', 'quoted', 'closed'].includes(params.status)) {
    query = query.eq('status', params.status)
  }

  const { data: rfqRequests, error } = await query

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Quote Requests</h1>
        <p className="text-muted-foreground">Manage customer quote requests and inquiries</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="text-destructive">Error loading requests. Please try again.</p>
        </div>
      ) : (
        <RfqTable 
          requests={(rfqRequests as (RFQRequest & { product: { name: string } | null })[]) || []} 
          currentStatus={params.status}
        />
      )}
    </div>
  )
}
