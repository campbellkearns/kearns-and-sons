'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface CommentFormProps {
  relationTo: string
  relationID: string
  onCommentSubmitted?: () => void
}

interface FormData {
  authorName: string
  authorEmail: string
  authorPhone: string
  content: string
}

interface FormErrors {
  authorName?: string
  authorEmail?: string
  content?: string
  general?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
  relationTo,
  relationID,
  onCommentSubmitted,
}) => {
  // Form configuration based on relation type
  const options = {
    memorials: {
      contentType: 'Condolence',
      placeholder: 'Share your condolences and memories...',
      submitText: 'Submit Condolence',
      description: 'Your condolence will be reviewed before appearing publicly.',
    },
    posts: {
      contentType: 'Comment',
      placeholder: 'Share your thoughts...',
      submitText: 'Submit Comment',
      description: 'Your comment will be reviewed before appearing publicly.',
    },
  }

  const { contentType, placeholder, submitText, description } =
    options[relationTo as keyof typeof options] || options.posts

  // Form state
  const [formData, setFormData] = useState<FormData>({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    content: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Name is required'
    }

    if (!formData.authorEmail.trim()) {
      newErrors.authorEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
      newErrors.authorEmail = 'Please enter a valid email address'
    }

    if (!formData.content.trim()) {
      newErrors.content = `${contentType} message is required`
    } else if (formData.content.trim().length < 10) {
      newErrors.content = `${contentType} must be at least 10 characters long`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorName: formData.authorName.trim(),
          authorEmail: formData.authorEmail.trim(),
          authorPhone: formData.authorPhone.trim() || undefined,
          content: formData.content.trim(),
          relationTo,
          relationID,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to submit comment')
      }

      // Success - reset form and show success message
      setFormData({
        authorName: '',
        authorEmail: '',
        authorPhone: '',
        content: '',
      })
      setIsSubmitted(true)
      
      // Call callback if provided
      onCommentSubmitted?.()

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting comment:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to submit comment. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Thank you for your {contentType.toLowerCase()}
        </h3>
        <p className="text-green-700 dark:text-green-300">
          {description} We appreciate you taking the time to share your thoughts.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Leave a {contentType}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
        {description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-800 dark:text-red-200 text-base">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="authorName" className="text-base font-medium">
              Name *
            </Label>
            <Input
              id="authorName"
              type="text"
              placeholder="Your Name"
              value={formData.authorName}
              onChange={(e) => handleInputChange('authorName', e.target.value)}
              className={`mt-2 text-base h-12 ${errors.authorName ? 'border-red-500 focus:ring-red-500' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.authorName && (
              <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.authorName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="authorEmail" className="text-base font-medium">
              Email *
            </Label>
            <Input
              id="authorEmail"
              type="email"
              placeholder="Your Email"
              value={formData.authorEmail}
              onChange={(e) => handleInputChange('authorEmail', e.target.value)}
              className={`mt-2 text-base h-12 ${errors.authorEmail ? 'border-red-500 focus:ring-red-500' : ''}`}
              required
              disabled={isSubmitting}
            />
            {errors.authorEmail && (
              <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.authorEmail}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="authorPhone" className="text-base font-medium">
            Phone Number <span className="text-gray-500">(optional)</span>
          </Label>
          <Input
            id="authorPhone"
            type="tel"
            placeholder="Your Phone Number"
            value={formData.authorPhone}
            onChange={(e) => handleInputChange('authorPhone', e.target.value)}
            className="mt-2 text-base h-12"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-base font-medium">
            {contentType} *
          </Label>
          <Textarea
            id="content"
            placeholder={placeholder}
            rows={6}
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className={`mt-2 text-base resize-none ${errors.content ? 'border-red-500 focus:ring-red-500' : ''}`}
            required
            disabled={isSubmitting}
          />
          {errors.content && (
            <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.content}</p>
          )}
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            {formData.content.length}/500 characters
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto text-base font-medium px-8"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </Button>
      </form>
    </div>
  )
}
