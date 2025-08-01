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
			<Button className={cn(className, "aria-pressed:bg-zinc-100")} {...rest}>
				{children}
			</Button>
		</Toggle>
	)
}
