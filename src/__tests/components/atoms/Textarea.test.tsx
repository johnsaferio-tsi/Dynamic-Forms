import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"
import Textarea from "@/components/atoms/Textarea"

const renderWithMantine = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe("Textarea component", () => {
  it("renders with label", () => {
    renderWithMantine(
      <Textarea
        label="Description"
        name="description"
        value=""
        onChange={() => {}}
        placeholder="Enter description"
      />
    )

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
  })

  it("shows required field error when empty after input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <Textarea
          label="Description"
          name="description"
          value={value}
          onChange={setValue}
          required
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const textarea = screen.getByLabelText(/description/i)
    fireEvent.change(textarea, { target: { value: "Some text" } })
    fireEvent.change(textarea, { target: { value: "" } })

    await waitFor(() =>
      expect(screen.getByText("This field is required.")).toBeInTheDocument()
    )
  })

  it("calls onChange with the correct value", () => {
    const handleChange = jest.fn()
    renderWithMantine(
      <Textarea
        label="Description"
        name="description"
        value=""
        onChange={handleChange}
      />
    )
    const textarea = screen.getByLabelText(/description/i)
    fireEvent.change(textarea, { target: { value: "New value" } })
    expect(handleChange).toHaveBeenCalledWith("New value")
  })
})
