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
			<div className="py-1 px-2 bg-white border border-black text-xs">
				{children}
			</div>
			<HoverCardArrow />
		</Content>
	)
}
