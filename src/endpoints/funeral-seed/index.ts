import type { Payload, PayloadRequest } from 'payload'

// Safe additive seed for funeral home content - never deletes existing data
export const funeralHomeSeed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('🏠 Seeding funeral home content...')

  try {
    // Check if home page already exists
    const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (existingHome.docs.length === 0) {
      payload.logger.info('📄 Creating home page...')
      
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Kearns & Sons Funeral Service',
          slug: 'home',
          _status: 'published',
          hero: {
            type: 'highImpact',
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Honoring Lives, Supporting Families',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h1',
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'For over three generations, Kearns & Sons has provided compassionate funeral services to our community. We understand that each life is unique and deserves to be celebrated with dignity, respect, and personal care.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            links: [
              {
                link: {
                  type: 'custom',
                  appearance: 'default',
                  label: 'View Memorials',
                  url: '/memorials',
                },
              },
              {
                link: {
                  type: 'custom',
                  appearance: 'outline',
                  label: 'Contact Us',
                  url: '/contact',
                },
              },
            ],
          },
          layout: [
            {
              blockName: 'Our Services',
              blockType: 'content',
              columns: [
                {
                  richText: {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'heading',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Our Services',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          tag: 'h2',
                          version: 1,
                        },
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'We offer a complete range of funeral services designed to honor your loved one and support your family during this difficult time.',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          textFormat: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  },
                  size: 'full',
                },
                {
                  richText: {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'heading',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Traditional Funerals',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          tag: 'h3',
                          version: 1,
                        },
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Complete funeral services including visitation, ceremony, and burial or entombment arrangements.',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          textFormat: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  },
                  size: 'oneThird',
                },
                {
                  richText: {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'heading',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Cremation Services',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          tag: 'h3',
                          version: 1,
                        },
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Dignified cremation services with memorial options to honor your loved one in a meaningful way.',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          textFormat: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  },
                  size: 'oneThird',
                },
                {
                  richText: {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'heading',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Memorial Services',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          tag: 'h3',
                          version: 1,
                        },
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              detail: 0,
                              format: 0,
                              mode: 'normal',
                              style: '',
                              text: 'Personalized celebration of life services that reflect the unique story of your loved one.',
                              version: 1,
                            },
                          ],
                          direction: 'ltr',
                          format: '',
                          indent: 0,
                          textFormat: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  },
                  size: 'oneThird',
                },
              ],
            },
            {
              blockName: 'About Us',
              blockType: 'cta',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'Three Generations of Compassionate Care',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      tag: 'h3',
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          detail: 0,
                          format: 0,
                          mode: 'normal',
                          style: '',
                          text: 'The Kearns family has been serving our community since 1952, providing guidance and support when families need it most. Our experienced staff understands the importance of honoring each life with dignity and respect.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
              links: [
                {
                  link: {
                    type: 'custom',
                    appearance: 'default',
                    label: 'About Our Family',
                    url: '/about',
                  },
                },
                {
                  link: {
                    type: 'custom',
                    appearance: 'outline',
                    label: 'Contact Us',
                    url: '/contact',
                  },
                },
              ],
            },
          ],
          meta: {
            title: 'Kearns & Sons Funeral Service - Honoring Lives, Supporting Families',
            description: 'Three generations of compassionate funeral services. Traditional funerals, cremation services, and memorial celebrations in a caring, professional environment.',
          },
          publishedAt: new Date().toISOString(),
        },
        context: {
          disableRevalidate: true,
        },
      })
      
      payload.logger.info('✅ Home page created successfully')
    } else {
      payload.logger.info('ℹ️ Home page already exists, skipping...')
    }

    // Set up minimal footer navigation
    payload.logger.info('🦶 Setting up footer navigation...')
    
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
        ],
      },
      context: {
        disableRevalidate: true,
      },
    })
    
    payload.logger.info('✅ Footer navigation configured')