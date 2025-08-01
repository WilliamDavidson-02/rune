import { insertBlankLine } from "@codemirror/commands"
import { EditorSelection } from "@codemirror/state"
import { EditorView, type KeyBinding } from "@codemirror/view"

// Codemirror only has a method to insert a blank line under the cirrent line(s)
export const insertBlankLineAbove = (view: EditorView) => {
	const { state } = view

	const { changes, selection } = state.changeByRange((range) => {
		const line = state.doc.lineAt(range.head)
		const { from } = state.doc.line(Math.max(1, line.number - 1))
		return {
			range: EditorSelection.cursor(from),
			changes: []
		}
	})

	view.dispatch({ changes, selection })

	return insertBlankLine(view)
}

export const keymaps: KeyBinding[] = [
	{
		key: "Shift-Mod-Enter",
		run: insertBlankLineAbove
	}
]
