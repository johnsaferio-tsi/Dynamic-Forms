import React from "react"
import { FileInput as MantineFileInput, Space } from "@mantine/core"

interface FileInputFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value?: File | null
  onChange: (value: File | null) => void
  name: string
  error?: string
  allowedExtensions: string[]
}

const FileInput: React.FC<FileInputFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  value,
  onChange,
  name,
  error: externalError,
  allowedExtensions,
}) => {
  const [error, setError] = React.useState<string | undefined>(externalError)

  React.useEffect(() => {
    setError(externalError)
  }, [externalError])

  const handleChange = (file: File | null) => {
    let err = ""
    if (required && !file) {
      err = "File is required"
    } else if (file && allowedExtensions && allowedExtensions.length > 0) {
      const ext = file.name.split(".").pop()?.toLowerCase()
      if (
        !ext ||
        !allowedExtensions.map((e) => e.toLowerCase()).includes(ext)
      ) {
        err = `Allowed file types: ${allowedExtensions.join(", ")}`
      }
    }
    setError(err)
    onChange(file)
  }

  return (
    <>
      <MantineFileInput
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        error={error}
        withAsterisk={required}
      />
      <Space h="md" />
    </>
  )
}

export default FileInput
