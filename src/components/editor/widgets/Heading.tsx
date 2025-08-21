import type { FC, HTMLAttributes } from "react"

import { Text } from "@components/core/Text"

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	children: React.ReactNode
	line: string
}

export const Heading: FC<HeadingProps> = ({ line, children, ...rest }) => {
	const splitHeading = (line: string) => {
		const match = /^(#{1,6})\s*(.*)$/.exec(line)
		if (!match) return null

		const [, hashes, content] = match
		return {
			hashes,
			content
		}
	}

	const heading = splitHeading(line)

	return (
		<Text as="span" {...rest}>
			{heading?.content}
		</Text>
	)
}
