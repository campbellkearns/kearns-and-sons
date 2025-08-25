// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Comments } from './collections/Comments'
import { Media } from './collections/Media'
import { Memorials } from './collections/Memorials'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Use cloud storage in production, local storage in development
const useCloudStorage = process.env.NODE_ENV === 'production'

// Email configuration - development vs production
const getEmailAdapter = () => {
  // Production: Use Resend if available
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is required in production')
    }

    return resendAdapter({
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS!,
      defaultFromName: process.env.EMAIL_FROM_NAME!,
      apiKey: process.env.RESEND_API_KEY,
    })
  }

  // Development: Use ethereal.email for testing (unless RESEND_API_KEY is provided)
  if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM_ADDRESS) {
    console.log('📧 Using Resend for development (API key found)')
    return resendAdapter({
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS,
      defaultFromName: process.env.EMAIL_FROM_NAME || 'Kearns & Sons Dev',
      apiKey: process.env.RESEND_API_KEY,
    })
  }

  console.log('📧 Using ethereal.email for development email testing')
  return nodemailerAdapter() // Automatically uses ethereal.email
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // Email configuration
  email: getEmailAdapter(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Memorials, Categories, Users, Comments],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // Conditionally add S3 storage in production

    s3Storage({
      enabled: useCloudStorage,
      collections: {
        media: {
          disableLocalStorage: true,
        },
      },
      bucket: process.env.HETZNER_BUCKET_NAME!,
      config: {
        credentials: {
          accessKeyId: process.env.HETZNER_ACCESS_KEY!,
          secretAccessKey: process.env.HETZNER_SECRET_KEY!,
        },
        region: 'us-east-1', // Hetzner uses this region format
        endpoint: process.env.HETZNER_ENDPOINT!,
        forcePathStyle: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
