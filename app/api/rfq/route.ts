import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const rfqSchema = z.object({
  customer_name: z.string().min(2),
  customer_email: z.string().email(),
  customer_phone: z.string().min(10),
  company_name: z.string().optional().nullable(),
  quantity: z.string().optional().nullable(),
  message: z.string().min(10),
  product_id: z.string().uuid().optional().nullable(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = rfqSchema.parse(body)

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('rfq_requests')
      .insert({
        ...validatedData,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit request' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('RFQ submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
