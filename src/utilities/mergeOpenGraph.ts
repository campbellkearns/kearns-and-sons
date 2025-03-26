import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Kearns & Sons Funeral Service',
  images: [
    {
      url: `${getServerSideURL()}/funeral-home-facade.webp`,
    },
  ],
  siteName: 'Kearns & Sons Funeral Service',
  title: 'Kearns & Sons Funeral Service',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
