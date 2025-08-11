import type { FC } from "react"
import { Toggle } from "@radix-ui/react-toggle"

import { Button, type ButtonProps } from "@components/core/Button"
import { cn } from "@lib/cn"

export type ToggleButtonProps = ButtonProps

export const ToggleButton: FC<ToggleButtonProps> = (props) => {
	const { children, className, ...rest } = props
	const ariaLabel = props["aria-label"]

	return (
		<Toggle aria-label={ariaLabel} asChild>
			<Button
				className={cn(
					className,
					"aria-pressed:bg-light-base-800 dark:aria-pressed:bg-dark-base-800 aria-pressed:ring-light-base-600 dark:aria-pressed:ring-dark-base-600"
				)}
				{...rest}
			>
				{children}
			</Button>
		</Toggle>
	)
}
