import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
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
				keymap.of([...defaultKeymap, ...historyKeymap]),
				history(),
				markdown({
					base: markdownLanguage,
					codeLanguages: languages,
					addKeymap: true
				}),
				baseTheme
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
