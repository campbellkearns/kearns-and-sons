import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Include formatting, e.g. (910) 576-0531',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'hours',
      type: 'textarea',
      label: 'Hours of Operation',
      admin: {
        description: 'e.g. Monday–Friday: 8am–5pm\nSaturday: 9am–1pm',
      },
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'text',
      label: 'Google Maps Embed URL',
      admin: {
        description: 'Paste the embed URL from Google Maps (Maps → Share → Embed a map → copy src URL)',
      },
    },
  ],
  labels: {
    singular: 'Contact Info',
    plural: 'Contact Info',
  },
}
