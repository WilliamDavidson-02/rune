import type { FC } from "react"

import { cn } from "@lib/cn"

export type Button = React.ComponentPropsWithRef<"button"> & {
	className?: string
}

export const Button: FC<Button> = ({
	className,
	children,
	ref,
	type,
	...rest
}) => {
	return (
		<button
			className={cn(className, "cursor-pointer")}
			ref={ref}
			type={type ?? "button"}
			{...rest}
		>
			{children}
		</button>
	)
}
