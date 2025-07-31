import { type FC } from "react"

import { useCodeMirror } from "@hooks/useCodemirror"

export const Editor: FC = () => {
	const { editorRef } = useCodeMirror<HTMLDivElement>()

	return <div className="h-full max-h-full" ref={editorRef} />
}
