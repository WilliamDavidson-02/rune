import { cn } from "@lib/cn"

type TextElement =
	| "p"
	| "span"
	| "label"
	| "strong"
	| "em"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "small"
	| "blockquote"
	| "abbr"
	| "cite"

export type TextProps<T extends TextElement> = {
	as?: T
	className?: string
	children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, "as">

export const Text = <T extends TextElement = "p">({
	as,
	className,
	children,
	...rest
}: TextProps<T>) => {
	const Component = (as || "p") as React.ElementType
	return (
		<Component className={cn(className, "")} {...rest}>
			{children}
		</Component>
	)
}
