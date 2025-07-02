import React, { useState, useEffect } from "react"
import { PasswordInput as MantinePasswordInput, Space } from "@mantine/core"

interface PasswordFieldProps {
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
}

const PasswordField: React.FC<PasswordFieldProps> = ({
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
      } else {
        setError(undefined)
      }
    }
  }, [value, required, minLength, maxLength])

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true)
      return
    }
    setError(undefined)
  }, [])

  const handleChange = (val: string) => {
    onChange?.(val)
  }

  return (
    <>
      <MantinePasswordInput
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleChange(event.currentTarget.value)}
        error={error}
        disabled={disabled}
        name={name}
      />
      <Space h="md" />
    </>
  )
}

export default PasswordField
