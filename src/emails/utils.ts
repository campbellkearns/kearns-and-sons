import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Utility functions for sending emails manually
 * For use with Payload Form Builder and other manual email needs
 */

/**
 * Send a test email (useful for development/testing)
 */
export const sendTestEmail = async (to: string) => {
  try {
    const payload = await getPayload({ config })

    await payload.sendEmail({
      to,
      subject: 'Test Email from Kearns & Sons',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the Kearns & Sons website.</p>
        <p>If you received this, your email configuration is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    })

    payload.logger.info(`Test email sent to ${to}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to send test email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Send memorial approval notification (when staff publishes a memorial)
 */
export const sendMemorialApprovalEmail = async ({
  _memorialId,
  memorialTitle,
  memorialSlug,
  submitterEmail,
}: {
  _memorialId: string
  memorialTitle: string
  memorialSlug: string
  submitterEmail?: string
}) => {
  try {
    const payload = await getPayload({ config })
    const memorialUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/memorials/${memorialSlug}`

    // Optionally notify the submitter that their memorial was approved
    if (submitterEmail) {
      await payload.sendEmail({
        to: submitterEmail,
        subject: `Memorial Published: ${memorialTitle}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Memorial Published</title>
          </head>
          <body style="font-family: Georgia, serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
              <h1>Kearns & Sons Funeral Service</h1>
              <p>Memorial Published</p>
            </div>
            
            <div style="padding: 30px;">
              <p>Thank you for submitting a memorial for <strong>${memorialTitle}</strong>.</p>
              
              <p>Your memorial has been reviewed and is now live on our website:</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${memorialUrl}" style="background: #2c3e50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                  View Memorial
                </a>
              </p>
              
              <p>Family and friends can now visit the memorial page to leave condolences and share memories.</p>
              
              <p>With sympathy,<br>
              The Kearns & Sons Team</p>
            </div>
          </body>
          </html>
        `,
      })

      payload.logger.info(`Memorial approval notification sent to ${submitterEmail}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to send memorial approval email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
