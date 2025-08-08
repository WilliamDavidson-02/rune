import { Decoration, EditorView } from "@codemirror/view"

import { treeIterator } from "./viewPlugin"

export const DISABLED_DOM_SPELL_CHECK = ["FencedCode"]

export const domSpellCheck = EditorView.contentAttributes.of({
	spellCheck: "true"
})

// The default browser spellcheck is enabled, but we don't want any spell check in i.e code blocks
export const disableSpellCheck = treeIterator(({ node, builder }) => {
	if (DISABLED_DOM_SPELL_CHECK.includes(node.name)) {
		builder.add(
			node.from,
			node.to,
			Decoration.mark({ attributes: { spellcheck: "false" } })
		)
	}
})
