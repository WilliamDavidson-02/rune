import { useEffect, useRef, useState } from "react"
import { closeBrackets } from "@codemirror/autocomplete"
import { history } from "@codemirror/commands"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { bracketMatching } from "@codemirror/language"
import { languages } from "@codemirror/language-data"
import { search } from "@codemirror/search"
import { EditorState } from "@codemirror/state"
import { drawSelection, EditorView, keymap } from "@codemirror/view"

import { SearchReplace } from "@components/editor/SearchReplace"
import { baseTheme } from "@components/editor/themes/baseTheme"
import { runeDark, runeLight } from "@components/editor/themes/runeDefault"
import { defaultKeymap } from "@lib/editor/commands"
import { disableSpellCheck, domSpellCheck } from "@lib/editor/spellcheck"
import { createComponentPanel } from "@lib/panel"
import { useThemeStore } from "@stores/theme"

export const useCodeMirror = <T extends Element>() => {
	const editorRef = useRef<T | null>(null)
	const [view, setView] = useState<EditorView>()
	const { theme, themeCompartment } = useThemeStore()

	const setPlaceholder = async (view: EditorView) => {
		const res = await fetch("./github_flavored_markdown_examples.txt")
		const txt = await res.text()

		view.dispatch({ changes: { from: 0, insert: txt } })
	}

	useEffect(() => {
		const isEditorCreated = editorRef.current?.innerHTML !== ""
		if (!editorRef.current || isEditorCreated) return

		const state = EditorState.create({
			doc: "",
			extensions: [
				baseTheme,
				themeCompartment.of(theme === "dark" ? runeDark : runeLight),
				keymap.of(defaultKeymap),
				history(),
				markdown({
					base: markdownLanguage,
					codeLanguages: languages,
					addKeymap: true
				}),
				bracketMatching(),
				closeBrackets(),
				EditorState.allowMultipleSelections.of(true),
				drawSelection(),
				search({
					createPanel: (view) =>
						createComponentPanel({
							component: <SearchReplace view={view} />,
							options: { top: true }
						})
				}),
				domSpellCheck,
				disableSpellCheck
			]
		})

		const newView = new EditorView({
			state,
			parent: editorRef.current
		})
		newView.focus()
		setPlaceholder(newView)
		setView(newView)
	}, [editorRef])

	useEffect(() => {
		if (!view) return

		view.dispatch({
			effects: themeCompartment.reconfigure(
				theme === "dark" ? runeDark : runeLight
			)
		})
	}, [theme])

	return { editorRef }
}
