import React from "react"
import { render, screen, fireEvent } from "@/utils/test-utils"
import FileInput from "@/components/atoms/FileInput"

describe("FileInput", () => {
  it("renders with label, description, and placeholder", () => {
    render(
      <FileInput
        label="Upload"
        name="file"
        description="Upload your file"
        placeholder="Choose file"
        value={null}
        onChange={jest.fn()}
        allowedExtensions={["pdf", "jpg"]}
      />
    )
    expect(screen.getByText("Upload")).toBeInTheDocument()
    expect(screen.getByText("Upload your file")).toBeInTheDocument()
    expect(screen.getByText("Choose file")).toBeInTheDocument()
  })

  it("accepts allowed file types and does not show error", () => {
    render(
      <FileInput
        label="Upload"
        name="file"
        value={null}
        onChange={jest.fn()}
        allowedExtensions={["pdf", "jpg"]}
        placeholder="Choose file"
      />
    )
    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    })
    const input = screen.getByText("Choose file") as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })
    expect(
      screen.queryByText("Allowed file types: pdf, jpg")
    ).not.toBeInTheDocument()
    expect(screen.queryByText("File is required")).not.toBeInTheDocument()
  })
})
