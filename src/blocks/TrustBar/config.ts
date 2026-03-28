import type { Block } from 'payload'

export const TrustBar: Block = {
  slug: 'trustBar',
  interfaceName: 'TrustBarBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'detail',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'Trust Bar',
    plural: 'Trust Bars',
  },
}
