import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"
import PasswordField from "@/components/atoms/PasswordInput"

const renderWithMantine = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe("PasswordField component", () => {
  it("renders with label and placeholder", () => {
    renderWithMantine(
      <PasswordField
        label="Password"
        name="password"
        value=""
        onChange={() => {}}
        placeholder="Enter password"
      />
    )
    expect(screen.getByText(/password/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument()
  })

  it("shows required field error when empty after input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <PasswordField
          label="Password"
          name="password"
          value={value}
          onChange={setValue}
          required
        />
      )
    }
    renderWithMantine(<Wrapper />)
    const input = screen.getByLabelText(/password/i)
    fireEvent.change(input, { target: { value: "abc" } })
    fireEvent.change(input, { target: { value: "" } })
    await waitFor(() =>
      expect(screen.getByText("This field is required.")).toBeInTheDocument()
    )
  })

  it("shows minLength error after typing short input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <PasswordField
          name="password"
          label="Password"
          value={value}
          onChange={setValue}
          minLength={5}
        />
      )
    }
    renderWithMantine(<Wrapper />)
    const input = screen.getByLabelText(/password/i)
    fireEvent.change(input, { target: { value: "abc" } })
    await waitFor(() =>
      expect(
        screen.getByText("Minimum length is 5 characters.")
      ).toBeInTheDocument()
    )
  })

  it("shows maxLength error after typing long input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <PasswordField
          name="password"
          label="Password"
          value={value}
          onChange={setValue}
          maxLength={4}
        />
      )
    }
    renderWithMantine(<Wrapper />)
    const input = screen.getByLabelText("Password")
    fireEvent.change(input, { target: { value: "abcdef" } })
    await waitFor(() =>
      expect(
        screen.getByText("Maximum length is 4 characters.")
      ).toBeInTheDocument()
    )
  })

  it("does not show error for valid input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <PasswordField
          name="password"
          label="Password"
          value={value}
          onChange={setValue}
          required
          minLength={3}
          maxLength={10}
        />
      )
    }
    renderWithMantine(<Wrapper />)
    const input = screen.getByLabelText(/password/i)
    fireEvent.change(input, { target: { value: "Secret123" } })
    await waitFor(() => {
      expect(
        screen.queryByText(/Minimum length|Maximum length|required/i)
      ).not.toBeInTheDocument()
    })
  })
})
