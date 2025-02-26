import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      fileUpload: {
        type: 'upload',
        labels: {
          singular: 'File',
          plural: 'Files',
        },
        admin: {
          description: 'Allow users to upload files as part of the form submission',
          components: {
            Field: () => {
              return null
            },
          },
        },
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Label',
            defaultValue: 'Upload File',
            admin: {
              description: 'The label that will be displayed on the form.',
            },
          },
          {
            name: 'relationTo',
            type: 'text',
            defaultValue: 'media',
            admin: {
              description:
                'The collection that the uploaded files will be stored in. Leave blank for no relation.',
            },
          },
          {
            name: 'required',
            type: 'checkbox',
            label: 'Required',
            defaultValue: false,
          },
          {
            name: 'accept',
            type: 'select',
            options: [
              { label: 'All Files', value: '*' },
              { label: 'Images', value: 'image/*' },
              { label: 'Videos', value: 'video/*' },
              { label: 'Documents', value: '.pdf,.doc,.docx,.txt' },
            ],
            defaultValue: '*',
            admin: {
              description:
                'Select the file types that users are allowed to upload. Leave blank for all file types.',
            },
          },
          {
            name: 'multiple',
            type: 'checkbox',
            label: 'Allow multifile uploads',
            defaultValue: false,
            admin: {
              description: 'Allow users to upload multiple files at once',
            },
          },
          {
            name: 'maxFileSize',
            type: 'number',
            label: 'Maximum file size (MB)',
            defaultValue: 5,
            admin: {
              description: 'Maximum file size in megabytes. Leave blank for no limit.',
            },
          },
          {
            name: 'maxFiles',
            type: 'number',
            label: 'Maximum number of files',
            admin: {
              description:
                'Maximum number of files that can be uploaded. Leave blank for no limit.',
              condition: (_, siblingData) => siblingData?.multiple,
            },
          },
        ],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
