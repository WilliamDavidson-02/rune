import type { Line } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

import { type SyntaxNodeRef } from "./viewPlugin"

const isTaskChecked = (line: string) => {
	return /\[x\]/i.test(line)
}

export const isCheckbox = (line: string) => {
	return /^\s*(- \[(x| )\]) /i.test(line)
}

export const getNodeTaskStatus = (node: SyntaxNodeRef, view: EditorView) => {
	const { from, to } = node
	const text = view.state.doc.sliceString(from, to)
	return String(isTaskChecked(text))
}

export const toggleTask = (line: Line) => {
	const startIndex = line.text.indexOf("- [")
	const checkbox = isTaskChecked(line.text) ? "- [ ]" : "- [x]"

	return {
		from: line.from + startIndex,
		to: line.from + startIndex + checkbox.length,
		insert: checkbox
	}
}
