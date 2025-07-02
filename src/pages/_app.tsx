import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "normalize.css"
import "@/styles/globals.css"

import { MantineProvider } from "@mantine/core"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
