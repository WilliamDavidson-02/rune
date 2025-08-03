import { type FC } from "react"

import { Editor } from "@components/editor/Editor"
import { useThemeMathMedia } from "@stores/theme"

export const App: FC = () => {
	useThemeMathMedia()

	return (
		<main className="h-svh">
			<Editor />
		</main>
	)
}
