import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

// Define FileUploadField type
export type FileUploadField = {
  blockType: 'fileUpload'
  name: string
  label: string
  required?: boolean
  width?: 'full' | 'half'
  accept?: string
  multiple?: boolean
  maxFileSize?: number
  maxFiles?: number
}

export const FileUpload: React.FC<
  FileUploadField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, errors, label, register, required, width, accept, multiple, maxFileSize, maxFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setFileError(null)
    
    if (!files?.length) {
      setSelectedFiles([])
      return
    }

    // Check max files
    if (maxFiles && files.length > maxFiles) {
      setFileError(`Maximum ${maxFiles} files allowed`)
      e.target.value = ''
      return
    }

    // Convert FileList to array
    const fileArray = Array.from(files)
    
    // Check file sizes
    if (maxFileSize) {
      const maxSizeInBytes = maxFileSize * 1024 * 1024 // Convert MB to bytes
      const oversizedFile = fileArray.find(file => file.size > maxSizeInBytes)
      
      if (oversizedFile) {
        setFileError(`File "${oversizedFile.name}" exceeds maximum size of ${maxFileSize}MB`)
        e.target.value = ''
        return
      }
    }
    
    setSelectedFiles(fileArray)
  }

  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      
      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={name}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted border-border"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-muted-foreground"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {accept ? `Accepted file types: ${accept}` : 'All file types accepted'}
              </p>
              {maxFileSize && (
                <p className="text-xs text-muted-foreground">
                  Max size: {maxFileSize}MB
                </p>
              )}
              {maxFiles && multiple && (
                <p className="text-xs text-muted-foreground">
                  Max files: {maxFiles}
                </p>
              )}
            </div>
            <input
              id={name}
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              {...register(name, { required })}
              onChange={handleFileChange}
            />
          </label>
        </div>
        
        {/* Display selected files */}
        {selectedFiles.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium">Selected files:</p>
            <ul className="mt-1 text-sm">
              {selectedFiles.map((file, index) => (
                <li key={index} className="text-muted-foreground">
                  {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Display file errors */}
        {fileError && (
          <p className="text-sm text-destructive">{fileError}</p>
        )}
        
        {errors[name] && <Error />}
      </div>
    </Width>
  )
}
