import React from "react"
import { render, screen, fireEvent } from "@/utils/test-utils"
import RadioGroup from "@/components/atoms/RadioGroup"

describe("RadioGroup", () => {
  const items = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
  ]

  it("renders with label and options", () => {
    render(<RadioGroup label="Framework" name="framework" items={items} />)
    expect(screen.getByText("Framework")).toBeInTheDocument()
    expect(screen.getByLabelText("React")).toBeInTheDocument()
    expect(screen.getByLabelText("Angular")).toBeInTheDocument()
    expect(screen.getByLabelText("Vue")).toBeInTheDocument()
  })

  it("calls onChange when a radio is selected", () => {
    const handleChange = jest.fn()
    render(
      <RadioGroup
        label="Framework"
        name="framework"
        items={items}
        value=""
        onChange={handleChange}
      />
    )
    fireEvent.click(screen.getByLabelText("Angular"))
    expect(handleChange).toHaveBeenCalledWith("angular")
  })

  it("displays error message when error prop is set", () => {
    render(
      <RadioGroup
        label="Framework"
        name="framework"
        items={items}
        error="This field is required"
      />
    )
    expect(screen.getByText("This field is required")).toBeInTheDocument()
  })

  it("supports required and description props", () => {
    render(
      <RadioGroup
        label="Framework"
        name="framework"
        items={items}
        required
        description="Choose your favorite framework"
      />
    )
    expect(
      screen.getByText("Choose your favorite framework")
    ).toBeInTheDocument()
    // Mantine adds an asterisk for required fields
    expect(screen.getByText("Framework").textContent).toContain("*")
  })
})
