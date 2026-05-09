import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { contactSchema } from '@/lib/validations'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(key)
  }
  return _resend
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = contactSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validated.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, company, message } = validated.data
    const supabase = await createClient()

    // Insert into database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ name, email, company, message })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    // Send notification email (wrapped in try-catch so DB insert still succeeds even if email fails)
    try {
      await getResend().emails.send({
        from: 'Orbis Solutions <noreply@orbissolutions.ca>',
        to: ['orbissolutions.ai@gmail.com'],
        subject: `New contact from ${name}${company ? ` (${company})` : ''}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      })

      // Send confirmation to user
      await getResend().emails.send({
        from: 'Orbis Solutions <noreply@orbissolutions.ca>',
        to: [email],
        subject: 'We received your message — Orbis Solutions',
        html: `
          <h2>Thanks for reaching out, ${name}!</h2>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, explore our <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog">blog</a> for AI insights and strategies.</p>
          <br>
          <p>Best,<br>The Orbis Solutions Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email sending fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
