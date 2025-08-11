import { type FC, type ReactNode } from "react"
import {
	HoverCardContent as Content,
	HoverCardArrow,
	HoverCard as Root
} from "@radix-ui/react-hover-card"

export type HoverCardProps = React.ComponentPropsWithoutRef<typeof Root> & {
	children: ReactNode
}

export const HoverCard: FC<HoverCardProps> = ({ children, ...rest }) => {
	return (
		<Root openDelay={1200} closeDelay={0} {...rest}>
			{children}
		</Root>
	)
}

export type HoverCardContentProps = React.ComponentPropsWithoutRef<
	typeof Content
> & {
	children: ReactNode
}

export const HoverCardContent: FC<HoverCardContentProps> = ({
	children,
	...rest
}) => {
	return (
		<Content {...rest}>
			<div className="py-1 px-2 bg-light-base-800 dark:bg-dark-base-800 border border-light-base-700 dark:border-dark-base-700 text-xs rounded-sm shadow-lg shadow-light-base-900 dark:shadow-dark-base-900">
				{children}
			</div>
			<HoverCardArrow className="fill-light-base-700 dark:fill-dark-base-700" />
		</Content>
	)
}
