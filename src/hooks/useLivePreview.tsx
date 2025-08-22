import { Decoration } from "@codemirror/view"

import { isNodeWithInRanges, WIDGET_MAP } from "@lib/editor/livePreview"
import { treeIterator } from "@lib/editor/viewPlugin"
import { Widget } from "@lib/editor/widget"

export const useLivePreview = () => {
	const renderLivePreview = treeIterator(({ node, view, builder }) => {
		const { name, from, to } = node
		const { state } = view
		const content = state.doc.sliceString(from, to)
		const inRange = isNodeWithInRanges(state, from, to)

		if (inRange) return

		if (WIDGET_MAP.includes(name)) {
			const widget = new Widget(content)
			builder.add(from, to, Decoration.widget({ widget }))
		}
	})

	return { renderLivePreview }
}
