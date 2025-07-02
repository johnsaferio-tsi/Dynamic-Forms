import "@testing-library/jest-dom"
import { configure } from "@testing-library/react"

// Suppress verbose DOM output in error messages
configure({
  getElementError: (message) => {
    const error = new Error(message ?? "Unknown Testing Library Error")
    error.name = "TestingLibraryElementError"
    return error
  },
})
