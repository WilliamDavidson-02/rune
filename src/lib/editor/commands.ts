import { closeBracketsKeymap } from "@codemirror/autocomplete"
import {
	defaultKeymap as cmDefaultKeymap,
	historyKeymap,
	indentWithTab,
	insertBlankLine,
	selectParentSyntax
} from "@codemirror/commands"
import { markdownKeymap } from "@codemirror/lang-markdown"
import { searchKeymap } from "@codemirror/search"
import { EditorSelection, type ChangeSpec } from "@codemirror/state"
import { EditorView, type KeyBinding } from "@codemirror/view"

import { toggleBolde, toggleItalic } from "./emphasis"
import { isCheckbox, toggleTask } from "./task"

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

export const handleInsertBlankLine = (view: EditorView) => {
	const { state } = view

	const { changes, selection } = state.changeByRange((range) => {
		const changes: ChangeSpec[] = []
		let line = state.doc.lineAt(range.from)

		while (line.from <= range.to) {
			if (isCheckbox(line.text)) {
				changes.push(toggleTask(line))
				line = state.doc.line(line.number + 1)
				continue
			}

			break
		}

		return {
			range,
			changes
		}
	})

	view.dispatch({ changes, selection })

	if (changes.empty) {
		return insertBlankLine(view)
	}

	return true
}

export const customKeymap: KeyBinding[] = [
	{
		key: "Shift-Mod-Enter",
		run: insertBlankLineAbove
	},
	{
		key: "Mod-b",
		run: toggleBolde,
		preventDefault: true
	},
	{
		key: "Mod-i",
		run: toggleItalic,
		preventDefault: true
	}
]

export const reMappedKeymap = cmDefaultKeymap.map((keymap: KeyBinding) => {
	// Replace default keymap Mod-i, so custom Mod-i can be used
	if (keymap.run === selectParentSyntax) {
		keymap.key = "Shift-Mod-i"
	}

	if (keymap.run === insertBlankLine) {
		keymap.run = handleInsertBlankLine
	}

	return keymap
})

export const defaultKeymap = [
	...reMappedKeymap,
	...customKeymap,
	...historyKeymap,
	...closeBracketsKeymap,
	...searchKeymap,
	...markdownKeymap,
	indentWithTab
]
