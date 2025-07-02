import React, { ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { MantineProvider } from "@mantine/core"

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
