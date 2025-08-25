import type { CollectionAfterChangeHook } from 'payload'
import type { Comment } from '@/payload-types'

// Future implementation: Email notification when new comments are submitted
// This hook can be enhanced to send notifications to staff when:
// - New comments are submitted (awaiting moderation)
// - Comments are approved/rejected
export const notifyModerators: CollectionAfterChangeHook<Comment> = async ({
  doc, // The comment document
  operation, // 'create' | 'update'
  req: _req, // PayloadRequest (unused but available for future notification implementation)
}) => {
  // Implementation placeholder for email notifications
  // Could integrate with services like:
  // - Resend, SendGrid, or Nodemailer for email
  // - Slack webhooks for team notifications
  // - SMS notifications for urgent moderation needs

  if (operation === 'create') {
    // New comment submitted - notify moderators
    console.log(`New comment submitted by ${doc.authorName} for moderation`)
  }

  if (operation === 'update' && doc.approved && doc.moderatedAt) {
    // Comment was just approved
    console.log(`Comment by ${doc.authorName} was approved`)
  }

  return doc
}
