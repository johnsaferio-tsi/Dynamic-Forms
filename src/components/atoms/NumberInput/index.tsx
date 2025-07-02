import React, { useState, useEffect } from "react"
import { NumberInput, Space } from "@mantine/core"

interface NumberFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value: number | string
  min?: number
  max?: number
  disabled?: boolean
  onChange?: (value: number | string) => void
  name: string
}

const NumberField: React.FC<NumberFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  value,
  min,
  max,
  name,
  disabled = false,
  onChange,
}) => {
  const [error, setError] = useState<string | undefined>()
  const [initialRender, setInitialRender] = useState(false)

  useEffect(() => {
    if (initialRender) {
      if (required && value === "") {
        setError("This field is required.")
      } else if (min !== undefined && Number(value) < min) {
        setError(`Minimum value is ${min}.`)
      } else if (max !== undefined && Number(value) > max) {
        setError(`Maximum value is ${max}.`)
      } else {
        setError(undefined)
      }
    }
  }, [value, required, min, max])

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true)
    }
    setError(undefined)
  }, [])

  const handleChange = (val: number | string) => {
    const parsed = typeof val === "string" ? parseFloat(val) : val
    if (!isNaN(parsed)) {
      onChange?.(parsed)
    } else {
      onChange?.("")
    }
  }

  return (
    <>
      <NumberInput
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        data-testid="number-input"
        name={name}
      />
      <Space h="md" />
    </>
  )
}

export default NumberField
