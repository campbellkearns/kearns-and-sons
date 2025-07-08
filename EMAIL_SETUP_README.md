# Setting up email with Resend

## Installation Complete ✅

The email system has been successfully implemented with the following features:

### 🚀 **What's Implemented**

1. **Development & Production Email Configuration**
   - Development: Uses ethereal.email for testing (no real emails sent)
   - Production: Uses Resend for real email delivery

2. **Automatic Email Notifications**
   - Memorial submissions via admin/API trigger staff notifications
   - New condolence messages trigger staff notifications  
   - New blog post comments trigger staff notifications
   - Professional, funeral home-appropriate email templates

3. **Contact Form System**
   - Powered by Payload Form Builder plugin
   - All submissions stored in database
   - Admin panel management interface
   - Automatic email notifications

### 📋 **Setup Instructions**

#### 1. Verify/Install Email Packages
Verify `package.json` contains the below packages.
```bash
@payloadcms/email-resend
@payloadcms/email-nodemailer
@payloadcms/plugin-form-builder
```

Install them, if they are not there with `npm install`.

#### 2. Configure Environment Variables
Add these to your `.env` file:
```env
# Resend API Key (get from resend.com dashboard [see below])
RESEND_API_KEY=your_resend_api_key_here

# Email Configuration (same as in repo README.md)
EMAIL_FROM_ADDRESS="from@your-tld.com"
EMAIL_FROM_NAME="Your Entity Name"
# Staff notification email addresses (add what you need)
ADMIN_EMAIL="recipient-of-emails@thebusiness.com"
STAFF_NOTIFICATION_EMAIL="another-recipient-who-needs-to-know@thebusiness.com"

```

#### 3. Set Up Resend Account
1. Go to [resend.com](https://resend.com) and create an account
2. Add the TLD of your server where you'll send emails from 
3. Add the DNS records to your domain provider (e.g. Cloudflare)
4. Get your Resend API key and add it to your environment variables

#### 4. Contact Form Setup
The contact form is managed through Payload's Form Builder:

**Admin Access:**
- **Forms Configuration**: `/admin/collections/forms`
- **Form Submissions**: `/admin/collections/form-submissions`

**To create a contact form:**
1. Go to `/admin/collections/forms`
2. Create a new form with fields like name, email, phone, message
3. Configure email notifications in the form settings
4. Add the form to a page using the Form Block

### 📧 **How Email Notifications Work**

#### **Development Mode**
- All emails go to ethereal.email (fake email service)
- Check console logs for ethereal.email links to view sent emails
- No real emails sent, no costs incurred

#### **Production Mode**
- Real emails sent via Resend
- Professional templates with custom branding
- Automatic notifications for staff

#### **Email Triggers**

1. **Memorial Submissions**: 
   - When a memorial is created with `submissionSource: 'api'` 
   - Triggers staff notification email
   - Located in: `src/hooks/emailNotifications.ts` → `notifyMemorialSubmission`

2. **Memorial Condolences**: 
   - When visitors leave condolences on memorial pages
   - Distinct green styling: "🌹 Memorial Condolence"
   - Located in: `src/hooks/emailNotifications.ts` → `notifyNewCondolence`

3. **Blog Post Comments**: 
   - When visitors comment on blog posts
   - Distinct yellow styling: "📝 Blog Comment" 
   - Located in: `src/hooks/emailNotifications.ts` → `notifyNewCondolence`

4. **Contact Form Submissions**: 
   - Handled by Payload Form Builder
   - Configure notifications in form settings
   - Automatic confirmation to submitter + notification to staff

### 🎨 **Email Templates**

Professional templates located in `src/emails/templates.ts`:

- **`getMemorialSubmissionTemplate`**: Dignified notifications when memorials need review
- **`getCondolenceNotificationTemplate`**: Respectful formatting for memorial condolences
- **`getPostCommentNotificationTemplate`**: Standard blog comment notifications  
- **`getCommentApprovalTemplate`**: Notify users when their comments are approved

All templates feature:
- Funeral home-appropriate styling
- High contrast for accessibility
- Professional, respectful tone
- Clear visual distinction between memorial condolences and blog comments

### 🔧 **Admin Panel Features**

#### **Comments/Condolences Management**
- **Collection**: `/admin/collections/comments`
- **Moderation**: Approve/reject comments before they're published
- **Distinction**: Clear labels for memorial condolences vs blog comments
- **Staff Tracking**: Records who approved comments and when

#### **Memorial Management**
- **Collection**: `/admin/collections/memorials`
- **Submission Tracking**: See source of memorial (admin, API, form)
- **Email Integration**: Automatic staff notifications for new submissions

#### **Form Management** 
- **Forms**: `/admin/collections/forms` - Configure contact forms
- **Submissions**: `/admin/collections/form-submissions` - View all contact submissions
- **Email Setup**: Configure automatic notifications within each form

### 🔒 **Access Control & Moderation**

#### **Public Access**
- Anyone can submit comments/condolences
- Anyone can submit contact forms
- Only approved content visible to public

#### **Staff Access**
- Full access to all submissions
- Moderation controls for comments
- Email notification management
- Submission tracking and history

### 🚨 **Important Notes**

1. **DNS Configuration Required**: Add Resend DNS records to your domain provider
2. **Environment Variables**: Different configs for development vs production
3. **Volume Limits**: Resend free tier: 3,000 emails/month, 100 emails/day

### 📱 **Accessibility Features**

Email templates are designed with accessibility in mind:
- High contrast colors (dark headers, clear text)
- Structured HTML for screen readers
- Professional serif fonts for readability
- Respectful tone appropriate for grieving families
- Clear visual hierarchy with proper headings

### 🔧 **Current Implementation Status**

✅ **Working Features:**
- Automatic email notifications for all content types
- Custom email templates
- Form Builder integration
- Comment/condolence moderation system
- Development/production email configuration

### 📞 **Testing Email System**

#### **Development Testing:**
1. Start development server: `npm run dev`
2. Submit a comment/condolence or contact form
3. Check console logs for ethereal.email preview URLs
4. Click the URLs to view sent emails in browser

#### **Production Testing:**
1. Deploy with real Resend API key
2. Submit test content through the website
3. Verify emails arrive at configured staff addresses

### 🛠 **Troubleshooting**

**Common Issues:**
1. **No emails in development**: Check console for ethereal.email URLs
2. **No emails in production**: Verify RESEND_API_KEY is set correctly
3. **DNS errors**: Ensure Resend DNS records are added to your domain
4. **Permission errors**: Check that staff notification email addresses are valid

