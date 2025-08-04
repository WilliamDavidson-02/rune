import { syntaxTree } from "@codemirror/language"
import { RangeSetBuilder } from "@codemirror/state"
import {
	Decoration,
	EditorView,
	ViewPlugin,
	ViewUpdate,
	type DecorationSet
} from "@codemirror/view"

export const DISABLED_DOM_SPELL_CHECK = ["FencedCode"]

export const domSpellCheck = EditorView.contentAttributes.of({
	spellCheck: "true"
})

// The default browser spellcheck is enabled, but we don't want any spell check in i.e code blocks
export const disableSpellCheck = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet

		constructor(view: EditorView) {
			this.decorations = this.buildDecorations(view)
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.viewportChanged)
				this.decorations = this.buildDecorations(update.view)
		}

		buildDecorations(view: EditorView): DecorationSet {
			const builder = new RangeSetBuilder<Decoration>()

			const tree = syntaxTree(view.state)
			const { from, to } = view.viewport

			tree.iterate({
				from,
				to,
				enter: (node) => {
					if (DISABLED_DOM_SPELL_CHECK.includes(node.name)) {
						builder.add(
							node.from,
							node.to,
							Decoration.mark({ attributes: { spellcheck: "false" } })
						)
					}
				}
			})

			return builder.finish()
		}
	},
	{
		decorations: (v) => v.decorations
	}
)
