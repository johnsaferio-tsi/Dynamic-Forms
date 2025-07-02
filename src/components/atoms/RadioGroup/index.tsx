import React from "react"
import { Radio, Group, Space } from "@mantine/core"

interface RadioFieldProps {
  label?: string
  required?: boolean
  description?: string
  name: string
  items: {
    value: string
    label: string
    checked?: boolean
    disabled?: boolean
  }[]
  error?: string
  value?: string
  onChange?: (value: string) => void
}

const RadioGroup: React.FC<RadioFieldProps> = ({
  label,
  required,
  description,
  name,
  items,
  error,
  value,
  onChange,
}) => {
  return (
    <>
      <Radio.Group
        name={name}
        label={label}
        description={description}
        withAsterisk={required}
        error={error}
        value={value}
        onChange={onChange}>
        <Group mt="xs">
          {items.map((item, key) => (
            <Radio
              key={`${name}_${key + 1}`}
              value={item.value}
              label={item.label}
            />
          ))}
        </Group>
      </Radio.Group>
      <Space h="md" />
    </>
  )
}

export default RadioGroup
