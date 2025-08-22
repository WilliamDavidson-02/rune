import { syntaxTree } from "@codemirror/language"
import { RangeSetBuilder } from "@codemirror/state"
import {
	Decoration,
	EditorView,
	ViewPlugin,
	ViewUpdate,
	type DecorationSet
} from "@codemirror/view"

// Codemirror does not export the type definition of SyntaxNodeRef since it is a type from @lezer/common
// There fore we infer the type from the syntaxTree function that codemirror exports to get the type of a node
export type SyntaxNodeRef = Parameters<
	Parameters<ReturnType<typeof syntaxTree>["iterate"]>[0]["enter"]
>[0]

type CallbackArgs = {
	node: SyntaxNodeRef
	view: EditorView
	builder: RangeSetBuilder<Decoration>
}

type Callback = (args: CallbackArgs) => void

export const treeIterator = (onNode: Callback) =>
	ViewPlugin.fromClass(
		class {
			decorations: DecorationSet

			constructor(view: EditorView) {
				this.decorations = this.buildDecorations(view)
			}

			update(update: ViewUpdate) {
				const shouldUpdate =
					update.docChanged || update.viewportChanged || update.selectionSet

				if (shouldUpdate) {
					this.decorations = this.buildDecorations(update.view)
				}
			}

			buildDecorations(view: EditorView): DecorationSet {
				const builder = new RangeSetBuilder<Decoration>()
				const { state, viewport } = view
				const tree = syntaxTree(state)

				const { from, to } = viewport

				tree.iterate({
					from,
					to,
					enter(node) {
						onNode({ node, view, builder })
					}
				})

				return builder.finish()
			}
		},
		{
			decorations: (v) => v.decorations
		}
	)
