import { Container, Grid, Space, Title, Center, Flex } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import JsonEditor from "@/components/atoms/JsonEditor"
import React from "react"
import FormFieldSet from "@/components/atoms/FieldSet"
import TextField from "@/components/atoms/TextInput"
import NumberField from "@/components/atoms/NumberInput"
import RadioGroup from "@/components/atoms/RadioGroup"
import CheckBoxGroup from "@/components/atoms/CheckBoxGroup"
import DateGroup from "@/components/atoms/DateGroup"
import Select from "@/components/atoms/Select"
import FileInput from "@/components/atoms/FileInput"
import Textarea from "@/components/atoms/Textarea"
import PasswordField from "@/components/atoms/PasswordInput"
import ExampleDrawer from "@/components/modules/ExampleDrawer"

type FieldType = Record<string, unknown>

type FormSchema = { formName: string; fields: FieldType[] }

const FormBuilder = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [formSchemas, setFormSchemas] = React.useState<FormSchema[] | null>(
    null
  )
  const [fieldValues, setFieldValues] = React.useState<
    Record<string, Record<string, unknown>>
  >({})

  const generateForm = (schemas: { formName: string; fields: unknown[] }[]) => {
    // Cast fields to FieldType[] for each form
    const typedSchemas: FormSchema[] = schemas.map((form) => ({
      formName: form.formName,
      fields: form.fields as FieldType[],
    }))
    setFormSchemas(typedSchemas)
    // Initialize field values for each form
    const allValues: Record<string, Record<string, unknown>> = {}
    typedSchemas.forEach((form) => {
      const initialValues: Record<string, unknown> = {}
      for (let i = 0; i < form.fields.length; i++) {
        const field = form.fields[i]
        if (field.type === "checkbox") {
          initialValues[field.name as string] = field.value ?? []
        } else if (field.type === "file") {
          initialValues[field.name as string] = field.value ?? null
        } else {
          initialValues[field.name as string] = field.value ?? ""
        }
      }
      allValues[form.formName] = initialValues
    })
    setFieldValues(allValues)
  }

  const handleFieldChange = (
    formName: string,
    name: string,
    value: unknown
  ) => {
    setFieldValues((prev) => ({
      ...prev,
      [formName]: {
        ...prev[formName],
        [name]: value,
      },
    }))
  }

  const renderField = (formName: string, field: FieldType) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string) =>
              handleFieldChange(formName, field.name as string, val)
            }
            minLength={field.minLength as number}
            maxLength={field.maxLength as number}
            disabled={field.disabled as boolean}
            type="text"
          />
        )
      case "email":
        return (
          <TextField
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string) =>
              handleFieldChange(formName, field.name as string, val)
            }
            minLength={field.minLength as number}
            maxLength={field.maxLength as number}
            disabled={field.disabled as boolean}
            type="email"
          />
        )
      case "number":
        const numberValue = fieldValues[formName]?.[field.name as string]
        return (
          <NumberField
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              typeof numberValue === "string" || typeof numberValue === "number"
                ? numberValue
                : ""
            }
            onChange={(val: number | string) =>
              handleFieldChange(formName, field.name as string, val)
            }
            min={field.min as number}
            max={field.max as number}
            disabled={field.disabled as boolean}
          />
        )
      case "radio":
        return (
          <RadioGroup
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            items={field.items as { value: string; label: string }[]}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string) =>
              handleFieldChange(formName, field.name as string, val)
            }
            error={undefined}
          />
        )
      case "checkbox":
        return (
          <CheckBoxGroup
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            items={field.items as { value: string; label: string }[]}
            value={
              (fieldValues[formName]?.[field.name as string] as string[]) ?? []
            }
            onChange={(val: string[]) =>
              handleFieldChange(formName, field.name as string, val)
            }
          />
        )
      case "date":
        return (
          <DateGroup
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string | null) =>
              handleFieldChange(formName, field.name as string, val)
            }
          />
        )
      case "select":
        return (
          <Select
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            items={field.items as { value: string; label: string }[]}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string | null) =>
              handleFieldChange(formName, field.name as string, val)
            }
          />
        )
      case "file":
        return (
          <FileInput
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as File) ?? null
            }
            onChange={(val: File | null) =>
              handleFieldChange(formName, field.name as string, val)
            }
            allowedExtensions={field.allowedExtensions as string[]}
          />
        )
      case "textarea":
        return (
          <Textarea
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string) =>
              handleFieldChange(formName, field.name as string, val)
            }
          />
        )
      case "password":
        return (
          <PasswordField
            key={field.name as string}
            label={field.label as string}
            name={field.name as string}
            required={field.required as boolean}
            description={field.description as string}
            placeholder={field.placeholder as string}
            value={
              (fieldValues[formName]?.[field.name as string] as string) ?? ""
            }
            onChange={(val: string) =>
              handleFieldChange(formName, field.name as string, val)
            }
            minLength={field.minLength as number}
            maxLength={field.maxLength as number}
            disabled={field.disabled as boolean}
          />
        )
      default:
        return null
    }
  }

  return (
    <Container fluid mt={10}>
      <Grid>
        <Grid.Col span={isMobile ? 12 : 8} offset={isMobile ? 0 : 2}>
          <Center>
            <Title order={1}>Build Your Own Forms - Just JSON</Title>
          </Center>
        </Grid.Col>
        {!isMobile && (
          <Grid.Col span={2}>
            <Flex
              justify={"flex-end"}
              align="center"
              style={{ height: "100%" }}>
              <ExampleDrawer />
            </Flex>
          </Grid.Col>
        )}
      </Grid>
      <Space h="lg" />
      <Grid gutter={isMobile ? "xs" : "md"}>
        {formSchemas ? (
          isMobile ? (
            <>
              <Grid.Col span={12}>
                <div
                  style={{
                    position: "relative",
                    height: "40vh",
                    maxHeight: "40vh",
                    overflow: "auto",
                    background: "#18181b",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    padding: 8,
                  }}>
                  <JsonEditor onGenerateForm={generateForm} />
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div style={{ width: "100%" }}>
                  {formSchemas.map((form) => (
                    <>
                      <FormFieldSet
                        key={form.formName}
                        fieldSetLegend={form.formName}>
                        {form.fields.map((field) =>
                          renderField(form.formName, field)
                        )}
                      </FormFieldSet>
                      <Space h="md" />
                    </>
                  ))}
                </div>
              </Grid.Col>
            </>
          ) : (
            <>
              <Grid.Col span={4}>
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    height: "85vh",
                    maxHeight: "85vh",
                    overflow: "auto",
                    background: "#18181b",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    padding: 8,
                  }}>
                  <JsonEditor onGenerateForm={generateForm} />
                </div>
              </Grid.Col>
              <Grid.Col span={8}>
                <div
                  style={{ height: "85vh", overflow: "auto", paddingRight: 8 }}>
                  {formSchemas.map((form) => (
                    <>
                      <FormFieldSet
                        key={form.formName}
                        fieldSetLegend={form.formName}>
                        {form.fields.map((field) =>
                          renderField(form.formName, field)
                        )}
                      </FormFieldSet>
                      <Space h="md" />
                    </>
                  ))}
                </div>
              </Grid.Col>
            </>
          )
        ) : (
          <Grid.Col span={12}>
            <div
              style={{
                position: "relative",
                height: isMobile ? "85vh" : "85vh",
                maxHeight: isMobile ? "85vh" : "85vh",
                overflow: "auto",
                background: "#18181b",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: 8,
              }}>
              <JsonEditor onGenerateForm={generateForm} />
            </div>
          </Grid.Col>
        )}
      </Grid>
      {isMobile && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 3000 }}>
          <ExampleDrawer />
        </div>
      )}
    </Container>
  )
}

export default FormBuilder
