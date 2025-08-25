'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Funeral home content seeded! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
    {' to see the home page and navigation.'}
  </div>
)

export const FuneralSeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Funeral home content already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/funeral-seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('An error occurred while seeding funeral home content.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Creating funeral home content....',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding funeral home content.',
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (creating content...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <div className="funeralSeedContainer">
        <div className="funeralSeedDescription">
          <p><strong>Create funeral home content:</strong> This will set up your website with appropriate funeral home content including:</p>
          <ul>
            <li>Professional home page with hero section and services overview</li>
            <li>Header navigation (Memorials, Contact)</li>
            <li>Footer navigation (Admin link)</li>
            <li>Sample memorial page (saved as draft)</li>
          </ul>
          <p><strong>⚠️ Note:</strong> This will update your site&apos;s navigation menus. Existing pages and users will not be affected.</p>
          <button 
            className="funeralSeedToggle" 
            onClick={() => setShowDetails(!showDetails)}
            type="button"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          {showDetails && (
            <div className="funeralSeedDetails">
              <h4>What exactly will this do?</h4>
              <ul>
                <li><strong>If home page doesn&apos;t exist:</strong> Creates a new home page with funeral-appropriate content</li>
                <li><strong>Header navigation:</strong> Sets to &quot;Memorials&quot; and &quot;Contact&quot; links</li>
                <li><strong>Footer navigation:</strong> Sets to just &quot;Admin&quot; link</li>
                <li><strong>Sample memorial:</strong> Creates one draft memorial for testing (not public)</li>
                <li><strong>Safe operation:</strong> Never deletes existing content or users</li>
              </ul>
            </div>
          )}
        </div>
        <button className="funeralSeedButton" onClick={handleClick} disabled={loading || seeded}>
          Create funeral home content
        </button>
        {message && <span className="funeralSeedStatus">{message}</span>}
      </div>
    </Fragment>
  )
}