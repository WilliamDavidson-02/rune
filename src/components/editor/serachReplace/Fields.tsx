import type { FC } from "react"

type Props = React.ComponentPropsWithoutRef<"div">

export const InputField: FC<Props> = ({ children }) => {
	return (
		<div className="col-span-2 flex gap-2 items-center px-2 rounded-sm bg-light-base-900 dark:bg-dark-base-900 border-light-base-700 dark:border-dark-base-700 border">
			{children}
		</div>
	)
}

export const ActionField: FC<Props> = ({ children }) => {
	return <div className="ml-auto flex items-center gap-2">{children}</div>
}

export const FieldWrapper: FC<Props> = ({ children }) => {
	return <div className="grid grid-cols-3">{children}</div>
}
