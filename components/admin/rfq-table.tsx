'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { RFQRequest } from '@/lib/types'

const statusOptions = [
  { value: 'all', label: 'All Requests' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'closed', label: 'Closed' },
]

const statusColors = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-100',
  reviewed: 'bg-blue-50 text-blue-700 border border-blue-100',
  quoted: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  closed: 'bg-slate-50 text-slate-700 border border-slate-150',
}

interface RfqTableProps {
  requests: (RFQRequest & { product: { name: string } | null })[]
  currentStatus?: string
}

export function RfqTable({ requests, currentStatus }: RfqTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    router.push(`/admin/rfq?${params.toString()}`)
  }

  const handleExportCsv = () => {
    const headers = ['Date', 'Customer', 'Email', 'Phone', 'Company', 'Product', 'Quantity', 'Status', 'Message']
    const rows = requests.map((r) => [
      new Date(r.created_at).toLocaleDateString(),
      r.customer_name,
      r.customer_email,
      r.customer_phone,
      r.company_name || '-',
      r.product?.name || 'General Inquiry',
      r.quantity || '-',
      r.status,
      r.message.replace(/"/g, '""'),
    ])

    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rfq-requests-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
        <h3 className="text-lg font-bold text-slate-900">No quote requests yet</h3>
        <p className="mt-2 text-sm text-slate-550 font-medium">
          {currentStatus ? `No ${currentStatus} requests found.` : 'Quote requests will appear here when customers submit them.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <Select value={currentStatus || 'all'} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white border-slate-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={handleExportCsv} className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold shadow-sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="text-muted-foreground">
                  {new Date(request.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{request.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{request.customer_email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-foreground">
                    {request.product?.name || 'General Inquiry'}
                  </p>
                  {request.company_name && (
                    <p className="text-sm text-muted-foreground">{request.company_name}</p>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {request.quantity || '-'}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[request.status]}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/rfq/${request.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
