import React from "react"
import { render, screen, fireEvent, waitFor } from "@/utils/test-utils"
import NumberField from "@/components/atoms/NumberInput"

describe("NumberField component", () => {
  it("renders with label and placeholder", () => {
    render(
      <NumberField
        label="Age"
        value={""}
        onChange={() => {}}
        placeholder="Enter your age"
        name="age"
      />
    )
    expect(screen.getByText(/age/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter your age")).toBeInTheDocument()
  })

  it("shows required field error when value is cleared", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<number | string>("")
      return (
        <NumberField
          name="age"
          label="Age"
          value={value}
          onChange={setValue}
          required
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByLabelText(/age/i)
    fireEvent.change(input, { target: { value: 25 } })
    fireEvent.change(input, { target: { value: "" } })
    await waitFor(() =>
      expect(screen.getByText("This field is required.")).toBeInTheDocument()
    )
  })

  it("shows min value error when value is too low", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<number | string>("")
      return (
        <NumberField
          name="age"
          label="Age"
          value={value}
          onChange={setValue}
          min={10}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByLabelText(/age/i)
    fireEvent.change(input, { target: { value: 5 } })
    await waitFor(() =>
      expect(screen.getByText("Minimum value is 10.")).toBeInTheDocument()
    )
  })

  it("shows max value error when value is too high", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<number | string>("")
      return (
        <NumberField
          name="age"
          label="Age"
          value={value}
          onChange={setValue}
          max={20}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByLabelText(/age/i)
    fireEvent.change(input, { target: { value: 25 } })
    await waitFor(() =>
      expect(screen.getByText("Maximum value is 20.")).toBeInTheDocument()
    )
  })

  it("does not show error for valid value", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<number | string>("")
      return (
        <NumberField
          label="Age"
          name="age"
          value={value}
          onChange={setValue}
          required
          min={10}
          max={20}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByLabelText(/age/i)
    fireEvent.change(input, { target: { value: 15 } })
    await waitFor(() => {
      expect(
        screen.queryByText(/Minimum value|Maximum value|required/i)
      ).not.toBeInTheDocument()
    })
  })

  it("calls onChange with the correct value", () => {
    const handleChange = jest.fn()
    render(
      <NumberField name="age" label="Age" value={10} onChange={handleChange} />
    )
    const input = screen.getByLabelText(/age/i)
    fireEvent.change(input, { target: { value: 20 } })
    expect(handleChange).toHaveBeenCalledWith(20)
  })

  it("is disabled when disabled prop is true", () => {
    render(
      <NumberField
        name="age"
        label="Age"
        value={10}
        onChange={() => {}}
        disabled
      />
    )
    const input = screen.getByLabelText(/age/i)
    expect(input).toBeDisabled()
  })
})
