import type { FC } from "react"

export const InputField: FC<React.ComponentPropsWithRef<"div">> = ({
	children
}) => {
	return (
		<div className="col-span-2 flex gap-2 items-center bg-white px-2 rounded-sm">
			{children}
		</div>
	)
}

export const ActionField: FC<React.ComponentPropsWithRef<"div">> = ({
	children
}) => {
	return <div className="ml-auto flex align-middle gap-2">{children}</div>
}
