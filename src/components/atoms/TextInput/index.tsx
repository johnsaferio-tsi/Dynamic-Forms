import React, { useState, useEffect } from "react"
import { TextInput, Space } from "@mantine/core"

interface TextFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value: string
  minLength?: number
  maxLength?: number
  disabled?: boolean
  name: string
  onChange?: (value: string) => void
  type?: "text" | "email"
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  value,
  minLength,
  maxLength,
  disabled = false,
  name,
  onChange,
  type = "text",
}) => {
  const [error, setError] = useState<string | undefined>()
  const [initialRender, setInitialRender] = useState(false)

  useEffect(() => {
    if (initialRender) {
      if (required && value.trim() === "") {
        setError("This field is required.")
      } else if (minLength && value.length < minLength) {
        setError(`Minimum length is ${minLength} characters.`)
      } else if (maxLength && value.length > maxLength) {
        setError(`Maximum length is ${maxLength} characters.`)
      } else if (type === "email" && value) {
        // Simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          setError("Please enter a valid email address.")
        } else {
          setError(undefined)
        }
      } else {
        setError(undefined)
      }
    }
  }, [value, required, minLength, maxLength, type])

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true)
      return
    }
    // Reset error state when value changes
    setError(undefined)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <>
      <TextInput
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        name={name}
        type={type}
      />
      <Space h="md" />
    </>
  )
}

export default TextField
