import type { Media } from '@/payload-types'

export const mediaFixture: Media = {
  id: 'fixture-media-1',
  alt: 'A fixture image for testing',
  url: 'https://placehold.co/800x600/1a2e4a/ffffff?text=Memorial',
  thumbnailURL: 'https://placehold.co/400x300/1a2e4a/ffffff?text=Memorial',
  width: 800,
  height: 600,
  filename: 'fixture.jpg',
  mimeType: 'image/jpeg',
  filesize: 123456,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}
