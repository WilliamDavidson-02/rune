import { type FC, type JSX } from 'react'
import { cn } from '@lib/cn'

type TextElement = keyof Pick<
	JSX.IntrinsicElements,
	| 'p'
	| 'span'
	| 'label'
	| 'strong'
	| 'em'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'small'
	| 'blockquote'
	| 'abbr'
	| 'cite'
>

export type Text<T extends TextElement = 'p'> = React.ComponentPropsWithRef<T> & {
	as?: T
	className?: string
}

export const Text: FC<Text> = ({ as, className, ref, ...rest }) => {
	const Component = as || 'p'
	return <Component className={cn(className, '')} ref={ref} {...rest}></Component>
}
