import React from "react"
import { useDisclosure } from "@mantine/hooks"
import { Drawer, ScrollArea, ActionIcon, Group } from "@mantine/core"
import { IconAdjustments } from "@tabler/icons-react"
import CodeCard from "@/components/modules/CodeCard"
import { basicJsons } from "@/utils/common"
import { useMediaQuery } from "@mantine/hooks"

const ExampleDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title={
          <Group
            justify="space-between"
            style={{ width: "100%", position: "relative" }}>
            <span>Example JSON</span>
          </Group>
        }
        position="right"
        size={isMobile ? "100vw" : "lg"}
        scrollAreaComponent={ScrollArea.Autosize}
        styles={{
          content: {
            padding: isMobile ? 4 : undefined,
            width: isMobile ? "100vw" : undefined,
            maxWidth: isMobile ? "100vw" : undefined,
          },
        }}>
        <div style={{ width: isMobile ? "90vw" : undefined }}>
          {basicJsons.map((json, index) => (
            <CodeCard key={index} code={json.code} title={json.name} />
          ))}
        </div>
      </Drawer>

      <ActionIcon
        variant="filled"
        color="orange"
        aria-label="Settings"
        onClick={open}
        style={
          isMobile
            ? {
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 2000,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }
            : {}
        }>
        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </>
  )
}

export default ExampleDrawer
