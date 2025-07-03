import React from "react"
import { Select, Space } from "@mantine/core"

interface SelectFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value?: string
  onChange: (value: string | null) => void
  name: string
  items: { value: string; label: string }[]
  error?: string
}

const SelectGroup: React.FC<SelectFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  value,
  onChange,
  name,
  items,
  error: externalError,
}) => {
  const [error, setError] = React.useState<string>("")

  const handleChange = (value: string | null) => {
    if (!value) {
      setError("Selection is required")
    } else {
      setError("")
    }
    onChange(value)
  }
  return (
    <>
      <Select
        label={label}
        required={required}
        description={description}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        error={externalError !== undefined ? externalError : error}
        data={items}
        withAsterisk={required}
        clearable
      />
      <Space h="md" />
    </>
  )
}

export default SelectGroup
