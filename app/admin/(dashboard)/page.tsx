import Link from 'next/link'
import { Package, FileText, Clock, CheckCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch stats
  const [productsResult, rfqResult, pendingRfqResult] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('rfq_requests').select('id', { count: 'exact', head: true }),
    supabase.from('rfq_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  const totalProducts = productsResult.count || 0
  const totalRfq = rfqResult.count || 0
  const pendingRfq = pendingRfqResult.count || 0

  // Fetch recent RFQ requests
  const { data: recentRfq } = await supabase
    .from('rfq_requests')
    .select('*, product:products(name)')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      href: '/admin/products',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Total Requests',
      value: totalRfq,
      icon: FileText,
      href: '/admin/rfq',
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Pending Requests',
      value: pendingRfq,
      icon: Clock,
      href: '/admin/rfq?status=pending',
      color: 'text-amber-600 bg-amber-100',
    },
    {
      title: 'Completed',
      value: totalRfq - pendingRfq,
      icon: CheckCircle,
      href: '/admin/rfq?status=closed',
      color: 'text-purple-600 bg-purple-100',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your business.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent RFQ requests */}
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Quote Requests</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/rfq">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentRfq && recentRfq.length > 0 ? (
            <div className="divide-y divide-border">
              {recentRfq.map((rfq: any) => (
                <div key={rfq.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">{rfq.customer_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {rfq.product?.name || 'General inquiry'} - {rfq.company_name || 'Individual'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      rfq.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      rfq.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      rfq.status === 'quoted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(rfq.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No quote requests yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
