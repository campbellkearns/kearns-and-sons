import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { notifyNewCondolence, notifyCommentModeration } from '../../hooks/emailNotifications'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    // Allow anyone to submit comments/condolences
    create: anyone,
    // Only show approved comments to public, all comments to authenticated users
    read: ({ req: { user } }) => {
      if (user) {
        // Authenticated users can see all comments
        return true
      }
      // Public users can only see approved comments
      return {
        approved: {
          equals: true,
        },
      }
    },
    // Only authenticated users can update/delete (for moderation)
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'content', 'relatedContentTitle', 'approved', 'createdAt'],
    pagination: {
      defaultLimit: 25,
    },
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Name',
      admin: {
        description: 'Full name of the person leaving the comment',
      },
    },
    {
      name: 'authorEmail',
      type: 'email',
      required: true,
      label: 'Email Address',
      admin: {
        description: 'Email address (not displayed publicly)',
      },
    },
    {
      name: 'authorPhone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Optional contact phone number (not displayed publicly)',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: {
        description: 'The condolence message or comment content',
        rows: 4,
      },
    },
    {
      name: 'relationTo',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Memorial',
          value: 'memorials',
        },
        {
          label: 'Post',
          value: 'posts',
        },
      ],
      admin: {
        description: 'What type of content this comment is for',
      },
    },
    {
      name: 'relationID',
      type: 'text',
      required: true,
      label: 'Related Content ID',
      admin: {
        description: 'ID of the memorial or post this comment belongs to',
        readOnly: true,
      },
    },
    {
      name: 'relatedContentTitle',
      type: 'text',
      label: 'Related Content',
      admin: {
        readOnly: true,
        description: 'Title of the memorial or post this comment belongs to',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          async ({ siblingData, req }) => {
            // Don't compute on creation since we don't have the related content yet
            if (!siblingData.relationID || !siblingData.relationTo) return ''
            
            try {
              // Fetch the related document to get its title
              const relatedDoc = await req.payload.findByID({
                collection: siblingData.relationTo,
                id: siblingData.relationID,
              })
              
              return relatedDoc?.title || 'Unknown'
            } catch (_ignoreError) {
              return 'Not Found'
            }
          },
        ],
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Approved',
      admin: {
        description: 'Whether this comment has been approved for public display',
        position: 'sidebar',
      },
    },
    {
      name: 'moderatedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Moderated By',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Staff member who approved/rejected this comment',
      },
    },
    {
      name: 'moderatedAt',
      type: 'date',
      label: 'Moderation Date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When this comment was moderated',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'When this comment was originally submitted',
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            // Set submission time on creation
            if (operation === 'create' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        // Set moderation fields when approval status changes
        if (operation === 'update' && req.user) {
          const originalData = req.data // This might need adjustment based on actual hook data
          if (data.approved !== originalData?.approved) {
            data.moderatedBy = req.user.id
            data.moderatedAt = new Date()
          }
        }
        return data
      },
    ],
    afterChange: [notifyNewCondolence, notifyCommentModeration],
    afterRead: [
      async ({ doc, req }) => {
        // Populate relatedContentTitle for display purposes
        if (doc.relationID && doc.relationTo && !doc.relatedContentTitle) {
          try {
            const relatedDoc = await req.payload.findByID({
              collection: doc.relationTo,
              id: doc.relationID,
            })
            doc.relatedContentTitle = relatedDoc?.title || 'Unknown'
          } catch (_ignoreError) {
            doc.relatedContentTitle = 'Not Found'
          }
        }
        return doc
      },
    ],
  },
  timestamps: true,
}
