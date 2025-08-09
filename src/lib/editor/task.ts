import { EditorView } from "@codemirror/view"

import { type SyntaxNodeRef } from "./viewPlugin"

const isTaskChecked = (line: string) => {
	return /^\[x\]/i.test(line)
}

export const getNodeTaskStatus = (node: SyntaxNodeRef, view: EditorView) => {
	const { from, to } = node
	const text = view.state.doc.sliceString(from, to)
	return String(isTaskChecked(text))
}
