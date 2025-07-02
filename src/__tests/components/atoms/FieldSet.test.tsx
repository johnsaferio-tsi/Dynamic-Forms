import React from "react"
import { render, screen } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"
import FormFieldSet from "@/components/atoms/FieldSet" // adjust path as needed

describe("FormFieldSet", () => {
  it("renders the fieldset with legend and children", () => {
    render(
      <MantineProvider>
        <FormFieldSet fieldSetLegend="User Info">
          <div>Child content</div>
        </FormFieldSet>
      </MantineProvider>
    )

    expect(screen.getByText("User Info")).toBeInTheDocument()
    expect(screen.getByText("Child content")).toBeInTheDocument()
  })
})
