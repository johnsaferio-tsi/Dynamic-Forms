import React from "react"
import { Checkbox, Group, Space } from "@mantine/core"

interface CheckBoxFieldProps {
  label?: string
  required?: boolean
  description?: string
  items: {
    value: string
    label: string
    checked?: boolean
    disabled?: boolean
    default?: boolean
  }[]
  value?: string[]
  onChange: (value: string[]) => void
  name: string
}

const CheckBoxGroup: React.FC<CheckBoxFieldProps> = ({
  label,
  required,
  description,
  name,
  items,
  value,
  onChange,
}) => {
  const [error, setError] = React.useState<string | undefined>()
  const defaultValue = items
    .filter((item) => item.default == true)
    .map((data) => data.value)

  const handleCheckboxChange = (val: string[]) => {
    if (required && val.length === 0) {
      setError("At least one checkbox must be selected.")
    } else {
      setError("")
    }

    onChange(val)
  }

  return (
    <>
      <Checkbox.Group
        defaultValue={defaultValue}
        label={label}
        description={description}
        withAsterisk={required}
        required={required}
        value={value}
        error={error}
        onChange={handleCheckboxChange}>
        <Group mt="xs">
          {items.map((item, key) => (
            <Checkbox
              key={`${name}_${key + 1}`}
              value={item.value}
              label={item.label}
              defaultChecked={item.checked}
            />
          ))}
        </Group>
      </Checkbox.Group>
      <Space h="md" />
    </>
  )
}

export default CheckBoxGroup
