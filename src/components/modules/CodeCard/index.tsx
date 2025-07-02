import React from "react"
import {
  Card,
  Group,
  Text,
  ActionIcon,
  CopyButton,
  Tooltip,
  Space,
} from "@mantine/core"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import JSONPretty from "react-json-pretty"
import "react-json-pretty/themes/monikai.css"
import { useMediaQuery } from "@mantine/hooks"

type CodeCardProps = {
  code: unknown
  title: string
}

const CodeCard: React.FC<CodeCardProps> = ({ code, title }) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={500}>{title}</Text>
            <CopyButton value={JSON.stringify(code)} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : "Copy"}
                  withArrow
                  position="right">
                  <ActionIcon
                    color={copied ? "teal" : "gray"}
                    variant="subtle"
                    onClick={copy}>
                    {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Card.Section>

        <Card.Section m="1">
          <JSONPretty
            data={code}
            valueStyle={isMobile ? "font-size: 1em" : "font-size: 1.5em"}
          />
        </Card.Section>
      </Card>
      <Space h="md" />
    </>
  )
}

export default CodeCard
