import React, { useRef, useState } from 'react'

interface PhotoUploadProps {
  label?: string
  onFileSelect: (file: File) => void
  preview?: string
  accept?: string
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  label = 'Subir Foto',
  onFileSelect,
  preview,
  accept = 'image/*',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)

      // Generate preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClear = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="flex gap-4">
        {/* Upload Area */}
        <div
          className="flex-1 relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <p className="text-sm font-medium text-gray-700">
            Haz clic para subir
          </p>
          <p className="text-xs text-gray-500 mt-1">
            o arrastra tu imagen aquí
          </p>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="relative w-24 h-24">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
            <button
              onClick={handleClear}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoUpload
