import type { CollectionAfterChangeHook } from 'payload'
import { getMemorialSubmissionTemplate, getCondolenceNotificationTemplate, getPostCommentNotificationTemplate } from '../emails/templates'

/**
 * Email notification hook for new memorial submissions
 * Sends notification to staff when a memorial is created via API submission
 */
export const notifyMemorialSubmission: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  // Only send notification for new memorials created via API submission
  if (operation === 'create' && (req.context?.source === 'api-submission' || doc.submissionSource === 'api')) {
    const adminUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/memorials/${doc.id}`
    
    try {
      await req.payload.sendEmail({
        to: process.env.STAFF_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL!,
        subject: `New Memorial Submission: ${doc.title}`,
        html: getMemorialSubmissionTemplate({
          deceasedName: doc.title,
          submittedBy: doc.submittedBy || 'Website Visitor',
          adminUrl,
        }),
      })
      
      req.payload.logger.info(`Memorial submission notification sent for ${doc.title}`)
    } catch (error) {
      req.payload.logger.error(`Failed to send memorial submission notification: ${error}`)
      // Don't throw error - email failure shouldn't break memorial creation
    }
  }
}

/**
 * Email notification hook for new comments/condolences
 * Sends different notifications based on whether it's a memorial condolence or post comment
 */
export const notifyNewCondolence: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  if (operation === 'create') {
    try {
      // Get the related memorial or post
      let relatedContent
      let contentUrl
      let emailSubject
      let emailTemplate

      if (doc.relationTo === 'memorials') {
        // This is a condolence on a memorial
        relatedContent = await req.payload.findByID({
          collection: 'memorials',
          id: doc.relationID,
        })
        contentUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/memorials/${relatedContent?.slug}`
        emailSubject = `New Memorial Condolence: ${relatedContent.title}`
        
        // Use condolence-specific template
        emailTemplate = getCondolenceNotificationTemplate({
          deceasedName: relatedContent.title,
          condolenceAuthor: doc.authorName,
          condolenceMessage: doc.content,
          memorialUrl: contentUrl,
        })
        
      } else if (doc.relationTo === 'posts') {
        // This is a comment on a blog post
        relatedContent = await req.payload.findByID({
          collection: 'posts',
          id: doc.relationID,
        })
        contentUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${relatedContent?.slug}`
        emailSubject = `New Blog Comment: ${relatedContent.title}`
        
        // Use post comment-specific template
        emailTemplate = getPostCommentNotificationTemplate({
          postTitle: relatedContent.title,
          commentAuthor: doc.authorName,
          commentMessage: doc.content,
          postUrl: contentUrl,
        })
      }

      if (relatedContent && emailTemplate) {
        await req.payload.sendEmail({
          to: process.env.STAFF_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL!,
          subject: emailSubject,
          html: emailTemplate,
        })
        
        const contentType = doc.relationTo === 'memorials' ? 'memorial condolence' : 'post comment'
        req.payload.logger.info(`${contentType} notification sent for ${relatedContent.title}`)
      }
    } catch (error) {
      req.payload.logger.error(`Failed to send comment/condolence notification: ${error}`)
      // Don't throw error - email failure shouldn't break comment creation
    }
  }
}

/**
 * Email notification hook for comment moderation
 * Optionally sends notifications when comments are approved/rejected
 */
export const notifyCommentModeration: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  // Only process updates where approval status changed
  if (operation === 'update' && previousDoc) {
    const wasApproved = previousDoc.approved
    const isNowApproved = doc.approved
    
    // If comment was just approved
    if (!wasApproved && isNowApproved) {
      try {
        // Get the related content
        let relatedContent
        if (doc.relationTo === 'memorials') {
          relatedContent = await req.payload.findByID({
            collection: 'memorials',
            id: doc.relationID,
          })
        } else if (doc.relationTo === 'posts') {
          relatedContent = await req.payload.findByID({
            collection: 'posts',
            id: doc.relationID,
          })
        }

        if (relatedContent) {
          // Optional: Send email to comment author notifying them of approval
          // This could be implemented based on your requirements
          req.payload.logger.info(`Comment approved for ${relatedContent.title} by ${doc.authorName}`)
        }
      } catch (error) {
        req.payload.logger.error(`Failed to process comment approval notification: ${error}`)
      }
    }
  }
}
