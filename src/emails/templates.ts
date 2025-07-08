/**
 * Email templates for Kearns & Sons Funeral Service
 * Professional, accessible templates for funeral home communications
 */

/**
 * Memorial condolence notification template
 * Sent to staff when someone leaves a condolence on a memorial
 */
export const getCondolenceNotificationTemplate = ({
  deceasedName,
  condolenceAuthor,
  condolenceMessage,
  memorialUrl,
}: {
  deceasedName: string
  condolenceAuthor: string
  condolenceMessage: string
  memorialUrl: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Condolence Message</title>
  <style>
    body { 
      font-family: Georgia, 'Times New Roman', serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      background: #f8f9fa;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header { 
      background: #2c3e50; 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
    }
    .content { padding: 30px; }
    .condolence { 
      background: #f8f9fa; 
      padding: 25px; 
      border-left: 4px solid #3498db; 
      margin: 20px 0; 
      font-style: italic;
      border-radius: 4px;
    }
    .button { 
      display: inline-block; 
      background: #2c3e50; 
      color: white; 
      padding: 14px 28px; 
      text-decoration: none; 
      border-radius: 6px; 
      margin: 20px 0;
      font-weight: 500;
    }
    .footer { 
      font-size: 14px; 
      color: #666; 
      text-align: center; 
      padding: 20px; 
      border-top: 1px solid #eee; 
      background: #f8f9fa;
    }
    .status {
      background: #fff3cd;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      border-left: 4px solid #ffc107;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Kearns & Sons Funeral Service</h1>
      <p>New Condolence Message</p>
    </div>
    
    <div class="content">
      <div style="background: #e8f5e8; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #28a745; font-size: 14px;">
        <strong>🌹 Memorial Condolence</strong> - This is a condolence message for a memorial service.
      </div>
      
      <p>A new condolence message has been left for <strong>${deceasedName}</strong>:</p>
      
      <div class="condolence">
        <p><strong>From:</strong> ${condolenceAuthor}</p>
        <p>"${condolenceMessage}"</p>
      </div>
      
      <div class="status">
        <strong>⏳ Awaiting Approval</strong> - This condolence is pending staff approval before being published.
      </div>
      
      <a href="${memorialUrl}" class="button">View Memorial Page</a>
      
      <p><em>Please review and approve this condolence message in the admin panel.</em></p>
    </div>
    
    <div class="footer">
      This notification was sent from the Kearns & Sons website.<br>
      Please do not reply to this email.
    </div>
  </div>
</body>
</html>
`

/**
 * Post comment notification template
 * Sent to staff when someone comments on a blog post
 */
export const getPostCommentNotificationTemplate = ({
  postTitle,
  commentAuthor,
  commentMessage,
  postUrl,
}: {
  postTitle: string
  commentAuthor: string
  commentMessage: string
  postUrl: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Blog Comment</title>
  <style>
    body { 
      font-family: Georgia, 'Times New Roman', serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      background: #f8f9fa;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header { 
      background: #2c3e50; 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
    }
    .content { padding: 30px; }
    .comment { 
      background: #e8f4fd; 
      padding: 25px; 
      border-left: 4px solid #2196f3; 
      margin: 20px 0; 
      border-radius: 4px;
    }
    .button { 
      display: inline-block; 
      background: #2c3e50; 
      color: white; 
      padding: 14px 28px; 
      text-decoration: none; 
      border-radius: 6px; 
      margin: 20px 0;
      font-weight: 500;
    }
    .footer { 
      font-size: 14px; 
      color: #666; 
      text-align: center; 
      padding: 20px; 
      border-top: 1px solid #eee; 
      background: #f8f9fa;
    }
    .status {
      background: #fff3cd;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      border-left: 4px solid #ffc107;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Kearns & Sons Funeral Service</h1>
      <p>New Blog Post Comment</p>
    </div>
    
    <div class="content">
      <div style="background: #fff3cd; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #ffc107; font-size: 14px;">
        <strong>📝 Blog Comment</strong> - This is a comment on a blog post, not a memorial condolence.
      </div>
      
      <p>A new comment has been left on the blog post:</p>
      
      <p><strong>Post:</strong> ${postTitle}</p>
      
      <div class="comment">
        <p><strong>Comment from:</strong> ${commentAuthor}</p>
        <p>${commentMessage}</p>
      </div>
      
      <div class="status">
        <strong>⏳ Awaiting Approval</strong> - This comment is pending staff approval before being published.
      </div>
      
      <a href="${postUrl}" class="button">View Blog Post</a>
      
      <p><em>Please review and approve this comment in the admin panel.</em></p>
    </div>
    
    <div class="footer">
      This notification was sent from the Kearns & Sons website blog system.<br>
      Please do not reply to this email.
    </div>
  </div>
</body>
</html>
`

/**
 * Comment/Condolence approval notification template
 * Sent to the comment author when their comment is approved
 */
export const getCommentApprovalTemplate = ({
  authorName,
  authorEmail,
  commentMessage,
  contentTitle,
  contentType,
  contentUrl,
}: {
  authorName: string
  authorEmail: string
  commentMessage: string
  contentTitle: string
  contentType: 'memorial' | 'post'
  contentUrl: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${contentType === 'memorial' ? 'Condolence' : 'Comment'} Has Been Approved</title>
  <style>
    body { 
      font-family: Georgia, 'Times New Roman', serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 600px; 
      margin: 0 auto; 
      background: #f8f9fa;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header { 
      background: #2c3e50; 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
    }
    .content { padding: 30px; }
    .approved {
      background: #e8f5e8;
      padding: 20px;
      border-left: 4px solid #28a745;
      margin: 20px 0;
      border-radius: 4px;
    }
    .your-message {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      font-style: italic;
      margin: 15px 0;
    }
    .button { 
      display: inline-block; 
      background: #2c3e50; 
      color: white; 
      padding: 14px 28px; 
      text-decoration: none; 
      border-radius: 6px; 
      margin: 20px 0;
      font-weight: 500;
    }
    .footer { 
      font-size: 14px; 
      color: #666; 
      text-align: center; 
      padding: 20px; 
      border-top: 1px solid #eee; 
      background: #f8f9fa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Kearns & Sons Funeral Service</h1>
      <p>Your ${contentType === 'memorial' ? 'Condolence' : 'Comment'} Has Been Approved</p>
    </div>
    
    <div class="content">
      <p>Dear ${authorName},</p>
      
      <div class="approved">
        <strong>✅ Approved and Published</strong><br>
        Your ${contentType === 'memorial' ? 'condolence message' : 'comment'} on "${contentTitle}" has been approved and is now visible to the public.
      </div>
      
      <p><strong>Your message:</strong></p>
      <div class="your-message">
        "${commentMessage}"
      </div>
      
      <p>Thank you for sharing your ${contentType === 'memorial' ? 'thoughts and condolences' : 'thoughts'}. Your message is now live and can be seen by family, friends, and other visitors.</p>
      
      <a href="${contentUrl}" class="button">View ${contentType === 'memorial' ? 'Memorial' : 'Post'}</a>
      
      <p style="margin-top: 30px;">With gratitude,<br>
      The Kearns & Sons Team</p>
    </div>
    
    <div class="footer">
      This notification was sent because your ${contentType === 'memorial' ? 'condolence' : 'comment'} was approved.<br>
      If you have questions, please contact us directly.
    </div>
  </div>
</body>
</html>
`
