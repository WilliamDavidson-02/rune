import type { FC } from "react"

import { cn } from "@lib/cn"

export type ButtonProps = React.ComponentPropsWithRef<"button"> & {
	className?: string
	size?: number
}

export const Button: FC<ButtonProps> = ({
	className,
	children,
	ref,
	type,
	size,
	...rest
}) => {
	return (
		<button
			style={size ? { width: size, height: size } : {}}
			className={cn(
				className,
				"cursor-pointer flex justify-center items-center rounded-sm outline-light-base-200 dark:outline-dark-base-200 focus:outline-solid"
			)}
			ref={ref}
			type={type ?? "button"}
			{...rest}
		>
			{children}
		</button>
	)
}
