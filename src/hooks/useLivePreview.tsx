import { Decoration } from "@codemirror/view"

import { isNodeWithInRanges, WIDGET_MAP } from "@lib/editor/livePreview"
import { treeIterator } from "@lib/editor/viewPlugin"
import { Widget } from "@lib/editor/widget"

export const useLivePreview = () => {
	const renderLivePreview = treeIterator(({ node, view, builder }) => {
		const { name, from, to } = node
		const { selection, doc } = view.state
		const content = doc.sliceString(from, to)

		if (isNodeWithInRanges(selection.ranges, from, to)) {
			return
		}

		if (content.length > 0 && WIDGET_MAP.includes(name)) {
			const widget = new Widget(content)
			builder.add(from, to, Decoration.widget({ widget }))
		}
	})

	return { renderLivePreview }
}
