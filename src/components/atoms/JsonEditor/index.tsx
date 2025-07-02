import dynamic from "next/dynamic"
import React, { useState } from "react"
import { validateField } from "@/utils/common"
import { Button, Center, Text } from "@mantine/core"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
})

interface JsonEditorProps {
  onGenerateForm: (forms: { formName: string; fields: unknown[] }[]) => void
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onGenerateForm }) => {
  const [jsonValue, setJsonValue] = useState("{}")
  const [error, setError] = useState("")

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(jsonValue) as {
        forms: { formName: string; fields: unknown[] }[]
      }
      if (!Array.isArray(parsed.forms)) {
        setError("JSON must have a 'forms' array.")
        return
      }
      for (let f = 0; f < parsed.forms.length; f++) {
        const form = parsed.forms[f]
        if (!form.formName || typeof form.formName !== "string") {
          setError(`Form ${f + 1}: must have a string 'formName'.`)
          return
        }
        if (!Array.isArray(form.fields)) {
          setError(`Form ${f + 1}: must have a 'fields' array.`)
          return
        }
        for (let i = 0; i < form.fields.length; i++) {
          const fieldError = validateField(
            form.fields[i] as Record<string, unknown>
          )
          if (fieldError) {
            setError(`Form ${f + 1}, Field ${i + 1}: ${fieldError}`)
            return
          }
        }
      }
      setError("")
      onGenerateForm(parsed.forms)
    } catch (e) {
      console.log(`error`, e)
      setError("Invalid JSON format.")
    }
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={jsonValue}
          onChange={(value) => setJsonValue(value || "")}
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <Center>
          <Button
            variant="filled"
            color="rgba(255, 136, 51, 1)"
            onClick={handleGenerate}>
            <Text c="black" size="md">
              Generate Form
            </Text>
          </Button>
        </Center>

        <Center>
          {error && (
            <div style={{ color: "rgb(223, 80, 80)", marginTop: 8 }}>
              {error}
            </div>
          )}
        </Center>
      </div>
    </div>
  )
}

export default JsonEditor
