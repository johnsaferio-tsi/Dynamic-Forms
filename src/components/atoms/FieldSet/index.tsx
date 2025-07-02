import React, { ReactNode } from "react"
import { Fieldset } from "@mantine/core"

interface FormFieldSetProps {
  children: ReactNode
  fieldSetLegend: string
}

const FormFieldSet: React.FC<FormFieldSetProps> = ({
  children,
  fieldSetLegend,
}) => {
  return <Fieldset legend={fieldSetLegend}>{children}</Fieldset>
}

export default FormFieldSet
