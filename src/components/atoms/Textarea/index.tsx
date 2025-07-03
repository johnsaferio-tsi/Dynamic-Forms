import React from "react"
import { Textarea as MantineTextarea, Space } from "@mantine/core"

interface TextareaFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  name: string
  error?: string
}

const Textarea: React.FC<TextareaFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  value,
  onChange,
  name,
  error: externalError,
}) => {
  const [error, setError] = React.useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value
    if (required && value.trim() === "") {
      setError("This field is required.")
    } else {
      setError("")
    }
    onChange(value)
  }
  return (
    <>
      <MantineTextarea
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        error={externalError !== undefined ? externalError : error}
        withAsterisk={required}
      />
      <Space h="md" />
    </>
  )
}

export default Textarea
