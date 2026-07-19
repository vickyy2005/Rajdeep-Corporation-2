import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { Resend } from 'resend'

const rfqSchema = z.object({
  customer_name: z.string().min(2),
  customer_email: z.string().email(),
  customer_phone: z.string().min(10),
  company_name: z.string().optional().nullable(),
  quantity: z.string().optional().nullable(),
  message: z.string().min(10),
  product_id: z.string().optional().nullable(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = rfqSchema.parse(body)

    let savedData = null
    let mock = false

    try {
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
        console.warn('Supabase error, continuing with fallback:', error)
        mock = true
      } else {
        savedData = data
      }
    } catch (dbError) {
      console.warn('Database error, continuing with fallback:', dbError)
      mock = true
    }

    // Try sending email via Resend if API key is present
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">New RFQ Quote Request Received</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Customer Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937;">${validatedData.customer_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937;"><a href="mailto:${validatedData.customer_email}" style="color: #2563eb; text-decoration: none;">${validatedData.customer_email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937;">${validatedData.customer_phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Company:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937;">${validatedData.company_name || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Quantity:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937;">${validatedData.quantity || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f0f0f0; color: #4b5563;">Product ID:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; color: #1f2937; font-family: monospace;">${validatedData.product_id || 'General Inquiry'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px; font-size: 14px;">Customer Message:</h3>
              <div style="background-color: #f9fafb; border-left: 4px solid #d1d5db; padding: 15px; font-style: italic; color: #4b5563; border-radius: 0 4px 4px 0; white-space: pre-line;">
                ${validatedData.message}
              </div>
            </div>
            <p style="margin-top: 25px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px;">
              This quote request has been logged successfully to your Admin Dashboard.
            </p>
          </div>
        `

        await resend.emails.send({
          from: 'Rajdeep Corp RFQ <onboarding@resend.dev>',
          to: 'rajdeepcorpn@gmail.com',
          subject: `[RFQ Request] New Inquiry from ${validatedData.customer_name}`,
          html: htmlContent,
        })
        console.log('RFQ email sent successfully via Resend.')
      } catch (emailError) {
        console.error('Failed to send email via Resend:', emailError)
      }
    } else {
      console.warn('RESEND_API_KEY is not defined. Skipping email dispatch.')
    }

    if (mock) {
      return NextResponse.json({ success: true, mock: true })
    }

    return NextResponse.json({ success: true, data: savedData })
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
