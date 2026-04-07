'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'

interface CondolenceFormProps {
  relationID: string
  onCondolenceSubmitted?: () => void
}

interface FormData {
  authorName: string
  authorEmail: string
  authorPhone?: string
  content: string
}

interface FormErrors {
  authorName?: string
  authorEmail?: string
  content?: string
  general?: string
}

export const CondolenceForm: React.FC<CondolenceFormProps> = ({
  relationID,
  onCondolenceSubmitted,
}) => {
  const [formData, setFormData] = useState<FormData>({
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    content: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      newErrors.content = 'A message is required'
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Please write at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: formData.authorName.trim(),
          authorEmail: formData.authorEmail.trim(),
          authorPhone: formData.authorPhone?.trim() || undefined,
          content: formData.content.trim(),
          relationTo: 'memorials',
          relationID,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to submit')
      }

      setFormData({ authorName: '', authorEmail: '', authorPhone: '', content: '' })
      setIsSubmitted(true)
      onCondolenceSubmitted?.()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      setErrors({
        general:
          error instanceof Error ? error.message : 'Failed to submit. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div role="status" className="p-6 bg-secondary border border-border rounded-lg">
        <h3 className="font-heading text-lg font-normal mb-2">Thank you for your condolence</h3>
        <p className="font-body text-base text-foreground">
          Your condolence will appear after a brief review. We appreciate you taking the time to
          share your thoughts.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 p-6 md:p-8 bg-card border border-border rounded-lg">
      <h3 className="font-heading text-xl font-normal mb-2">Share a Condolence</h3>
      <p className="font-body text-base text-muted-foreground mb-6">
        Your condolence will appear after a brief review.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div role="alert" className="p-4 bg-muted border border-destructive rounded-md">
            <p className="font-body text-base text-destructive">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Name *" id="authorName" error={errors.authorName}>
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.authorName}
              onChange={(e) => handleInputChange('authorName', e.target.value)}
              required
              disabled={isSubmitting}
            />
          </FormField>

          <FormField label="Email *" id="authorEmail" error={errors.authorEmail}>
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.authorEmail}
              onChange={(e) => handleInputChange('authorEmail', e.target.value)}
              required
              disabled={isSubmitting}
            />
          </FormField>
        </div>

        <FormField
          label="Phone Number (optional)"
          id="authorPhone"
        >
          <Input
            type="tel"
            placeholder="Your Phone Number"
            value={formData.authorPhone}
            onChange={(e) => handleInputChange('authorPhone', e.target.value)}
            disabled={isSubmitting}
          />
        </FormField>

        {/* Textarea: manual ARIA wiring supports both counter + error in aria-describedby */}
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-body text-base font-normal leading-snug">
            Message *
          </label>
          <Textarea
            id="content"
            placeholder="Share your condolences and memories…"
            rows={6}
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className="resize-none"
            aria-invalid={!!errors.content || undefined}
            aria-describedby={`content-counter${errors.content ? ' content-error' : ''}`}
            required
            disabled={isSubmitting}
          />
          {errors.content && (
            <p id="content-error" role="alert" className="font-body text-sm text-destructive">
              {errors.content}
            </p>
          )}
          <p
            id="content-counter"
            aria-live="polite"
            className="font-body text-sm text-muted-foreground"
          >
            {formData.content.length}/500 characters
          </p>
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Submitting…' : 'Send Condolence'}
        </Button>
      </form>
    </div>
  )
}
