'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const CommentForm: React.FC<{ relationTo: string; relationID: string }> = ({
  relationTo,
  relationID,
}) => {
  // This component is setup to submit comments on either Memorials or Posts.
  const options = {
    memorials: {
      contentType: 'Condolence',
      placeholder: 'Share your condolences and memories...',
      submitText: 'Submit Condolence',
    },
    posts: {
      contentType: 'Comment',
      placeholder: 'Share your thoughts...',
      submitText: 'Submit Comment',
    },
  }

  const { contentType, placeholder, submitText } =
    options[relationTo as keyof typeof options] || options.posts
  return (
    <form className="flex flex-col gap-4">
      <Input type="text" placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Textarea placeholder={placeholder} rows={4} required />
      <Button type="submit">{submitText}</Button>
    </form>
  )
}
