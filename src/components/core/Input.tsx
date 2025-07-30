import { cn } from '@lib/cn'
import { type FC } from 'react'

export type Input = React.ComponentPropsWithRef<'input'> & {
	className?: string
}

export const Input: FC<Input> = ({ className, ref, ...rest }) => {
	return <input className={cn(className, 'p-1')} ref={ref} {...rest} />
}
