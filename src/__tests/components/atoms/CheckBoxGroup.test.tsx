import React from "react"
import { render, screen, fireEvent } from "@/utils/test-utils"
import CheckBoxGroup from "@/components/atoms/CheckBoxGroup"

describe("CheckBoxGroup", () => {
  const items = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ]

  it("renders with label and options", () => {
    render(
      <CheckBoxGroup
        label="Languages"
        name="languages"
        items={items}
        value={[]}
        onChange={jest.fn()}
      />
    )
    expect(screen.getByText("Languages")).toBeInTheDocument()
    expect(screen.getByLabelText("TypeScript")).toBeInTheDocument()
    expect(screen.getByLabelText("JavaScript")).toBeInTheDocument()
    expect(screen.getByLabelText("Python")).toBeInTheDocument()
  })

  it("calls onChange with correct values when a checkbox is selected/deselected", () => {
    const handleChange = jest.fn()
    render(
      <CheckBoxGroup
        label="Languages"
        name="languages"
        items={items}
        value={[]}
        onChange={handleChange}
      />
    )
    fireEvent.click(screen.getByLabelText("TypeScript"))
    expect(handleChange).toHaveBeenCalledWith(["typescript"])
  })

  it("shows error when required and none selected, clears error when one is selected", () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<string[]>([])
      return (
        <CheckBoxGroup
          label="Languages"
          name="languages"
          items={items}
          value={value}
          onChange={setValue}
          required
        />
      )
    }
    render(<Wrapper />)

    fireEvent.click(screen.getByLabelText("TypeScript"))
    fireEvent.click(screen.getByLabelText("TypeScript"))
    expect(
      screen.getByText("At least one checkbox must be selected.")
    ).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText("TypeScript"))
    expect(
      screen.queryByText("At least one checkbox must be selected.")
    ).not.toBeInTheDocument()
  })

  it("supports description and required props", () => {
    render(
      <CheckBoxGroup
        label="Languages"
        name="languages"
        items={items}
        value={[]}
        onChange={jest.fn()}
        required
        description="Select your favorite languages"
      />
    )
    expect(
      screen.getByText("Select your favorite languages")
    ).toBeInTheDocument()
    expect(screen.getByText("Languages").textContent).toContain("*")
  })
})
