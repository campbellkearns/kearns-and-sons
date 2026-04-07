import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'servicesLinks',
      label: 'Services Column Links',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'companyLinks',
      label: 'Company Column Links',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Business address. Line breaks render as separate lines in the footer.',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      admin: {
        description: 'Click-to-call phone number. Include formatting, e.g. (910) 576-0531',
      },
    },
    {
      name: 'hoursOfOperation',
      type: 'textarea',
      admin: {
        description:
          'Hours of operation, e.g. "Mon–Fri: 8am–6pm\\nAvailable 24/7 for emergencies"',
      },
    },
    {
      name: 'serviceArea',
      type: 'text',
      admin: {
        description: 'Service area descriptor, e.g. "Troy, NC and surrounding communities"',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
