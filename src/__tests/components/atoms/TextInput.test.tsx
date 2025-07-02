import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"
import TextInput from "@/components/atoms/TextInput" // adjust the path as needed

const renderWithMantine = (ui: React.ReactNode) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe("TextInput component", () => {
  it("renders with label and placeholder", () => {
    renderWithMantine(
      <TextInput
        label="Username"
        name="username"
        value=""
        onChange={() => {}}
        placeholder="Enter name"
      />
    )

    expect(screen.getByText(/username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument()
  })

  it("shows required field error when empty after input", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <TextInput
          label="Username"
          name="username"
          value={value}
          onChange={setValue}
          required
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText(/username/i)
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
        <TextInput
          name="username"
          label="Username"
          value={value}
          onChange={setValue}
          minLength={5}
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText(/username/i)
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
        <TextInput
          name="username"
          label="Username"
          value={value}
          onChange={setValue}
          maxLength={4}
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText("Username")
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
        <TextInput
          name="username"
          label="Username"
          value={value}
          onChange={setValue}
          required
          minLength={3}
          maxLength={10}
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText(/username/i)
    fireEvent.change(input, { target: { value: "JohnDoe" } })

    await waitFor(() => {
      expect(
        screen.queryByText(/Minimum length|Maximum length|required/i)
      ).not.toBeInTheDocument()
    })
  })

  it("shows error for invalid email address", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <TextInput
          name="email"
          label="Email"
          value={value}
          onChange={setValue}
          type="email"
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText(/email/i)
    fireEvent.change(input, { target: { value: "notanemail" } })

    await waitFor(() =>
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument()
    )
  })

  it("does not show error for valid email address", async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState("")
      return (
        <TextInput
          name="email"
          label="Email"
          value={value}
          onChange={setValue}
          type="email"
        />
      )
    }

    renderWithMantine(<Wrapper />)

    const input = screen.getByLabelText(/email/i)
    fireEvent.change(input, { target: { value: "test@example.com" } })

    await waitFor(() => {
      expect(
        screen.queryByText("Please enter a valid email address.")
      ).not.toBeInTheDocument()
    })
  })
})
