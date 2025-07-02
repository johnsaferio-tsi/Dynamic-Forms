import React from "react"
import { render, screen } from "@/utils/test-utils"
import DateGroup from "@/components/atoms/DateGroup"

describe("DateGroup", () => {
  it("renders with label, description, and placeholder", () => {
    render(
      <DateGroup
        label="Event Date"
        name="event-date"
        description="Pick your event date"
        placeholder="Select date"
        value={""}
        onChange={jest.fn()}
      />
    )
    expect(screen.getByText("Event Date")).toBeInTheDocument()
    expect(screen.getByText("Pick your event date")).toBeInTheDocument()
    expect(screen.getByText("Select date")).toBeInTheDocument()
  })

  it("shows asterisk when required", () => {
    render(
      <DateGroup
        label="Event Date"
        name="event-date"
        value={""}
        onChange={jest.fn()}
        required
      />
    )
    expect(screen.getByText("Event Date").textContent).toContain("*")
  })
})
