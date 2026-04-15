'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import type { RFQRequest } from '@/lib/types'

const statusOptions: { value: RFQRequest['status']; label: string; description: string }[] = [
  { value: 'pending', label: 'Pending', description: 'Awaiting review' },
  { value: 'reviewed', label: 'Reviewed', description: 'Request has been reviewed' },
  { value: 'quoted', label: 'Quoted', description: 'Quote sent to customer' },
  { value: 'closed', label: 'Closed', description: 'Request completed' },
]

interface RfqStatusUpdateProps {
  rfqId: string
  currentStatus: RFQRequest['status']
  currentNotes: string | null
}

export function RfqStatusUpdate({ rfqId, currentStatus, currentNotes }: RfqStatusUpdateProps) {
  const router = useRouter()
  const [status, setStatus] = useState<RFQRequest['status']>(currentStatus)
  const [notes, setNotes] = useState(currentNotes || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('rfq_requests')
        .update({
          status,
          admin_notes: notes || null,
        })
        .eq('id', rfqId)

      if (error) throw error

      toast.success('Request updated successfully')
      router.refresh()
    } catch {
      toast.error('Failed to update request')
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges = status !== currentStatus || notes !== (currentNotes || '')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as RFQRequest['status'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Admin Notes</Label>
          <Textarea
            placeholder="Add internal notes about this request..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            These notes are only visible to admins.
          </p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
          className="w-full"
        >
          {isSaving ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
