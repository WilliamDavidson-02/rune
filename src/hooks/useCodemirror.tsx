import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { bracketMatching } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { EditorState } from '@codemirror/state'
import { drawSelection, EditorView, keymap } from '@codemirror/view'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { baseTheme } from '@components/editor/themes/baseTheme'
import { useEffect, useRef } from 'react'

export const useCodeMirror = <T extends Element>() => {
	const editorRef = useRef<T | null>(null)

	useEffect(() => {
		const isEditorCreated = editorRef.current?.innerHTML !== ''
		if (!editorRef.current || isEditorCreated) return

		const state = EditorState.create({
			doc: '',
			extensions: [
				baseTheme,
				keymap.of([...defaultKeymap, ...historyKeymap, ...closeBracketsKeymap]),
				history(),
				markdown({
					base: markdownLanguage,
					codeLanguages: languages,
					addKeymap: true
				}),
				bracketMatching(),
				closeBrackets(),
				EditorState.allowMultipleSelections.of(true),
				drawSelection()
			]
		})

		const view = new EditorView({
			state,
			parent: editorRef.current
		})
		view.focus()
	}, [editorRef])

	return { editorRef }
}
