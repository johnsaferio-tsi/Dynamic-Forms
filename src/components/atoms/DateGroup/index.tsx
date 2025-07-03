import React from "react"
import { DatePickerInput } from "@mantine/dates"

import { Space } from "@mantine/core"
import "@mantine/dates/styles.css"

interface DateGroupFieldProps {
  label?: string
  required?: boolean
  description?: string
  placeholder?: string
  value?: string
  onChange: (value: string | null) => void
  name: string
  error?: string
}
const DateGroup: React.FC<DateGroupFieldProps> = ({
  label,
  required,
  description,
  placeholder,
  name,
  value,
  onChange,
  error: externalError,
}) => {
  const [dateError, setDateError] = React.useState<string>("")

  const handleDateChange = (value: string | null) => {
    if (!value) {
      setDateError("Date is required")
    } else {
      setDateError("")
    }
    onChange(value || "")
  }
  return (
    <>
      <DatePickerInput
        placeholder={placeholder}
        label={label}
        description={description}
        error={externalError !== undefined ? externalError : dateError}
        withAsterisk={required}
        onChange={handleDateChange}
        required={required}
        name={name}
        value={value ? new Date(value) : null}
      />
      <Space h="md" />
    </>
  )
}

export default DateGroup
