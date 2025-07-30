import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { bracketMatching } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { EditorState } from '@codemirror/state'
import { drawSelection, EditorView, keymap } from '@codemirror/view'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { search, searchKeymap } from '@codemirror/search'
import { baseTheme } from '@components/editor/themes/baseTheme'
import { useEffect, useRef } from 'react'
import { createComponentPanel } from '@lib/panel'
import { SearchReplace } from '@components/editor/SearchReplace'

export const useCodeMirror = <T extends Element>() => {
	const editorRef = useRef<T | null>(null)

	const setPlaceholder = async (view: EditorView) => {
		const res = await fetch('./github_flavored_markdown_examples.txt')
		const txt = await res.text()

		view.dispatch({ changes: { from: 0, insert: txt } })
	}

	useEffect(() => {
		const isEditorCreated = editorRef.current?.innerHTML !== ''
		if (!editorRef.current || isEditorCreated) return

		const state = EditorState.create({
			doc: '',
			extensions: [
				baseTheme,
				keymap.of([...defaultKeymap, ...historyKeymap, ...closeBracketsKeymap, ...searchKeymap]),
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
						}),
					scrollToMatch: (range) => EditorView.scrollIntoView(range, { y: 'center' })
				})
			]
		})

		const view = new EditorView({
			state,
			parent: editorRef.current
		})
		view.focus()
		setPlaceholder(view)
	}, [editorRef])

	return { editorRef }
}
