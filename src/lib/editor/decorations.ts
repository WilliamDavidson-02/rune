import { Decoration } from "@codemirror/view"

import { toKebab } from "@lib/textTransformation"

import { isNodeWithInRanges } from "./livePreview"
import { getNodeTaskStatus } from "./task"
import { treeIterator } from "./viewPlugin"

const previewClassNames = new Map([["CodeMark", " cm-code-mark-preview"]])

const allowedClassNames = [
	"InlineCode",
	"CodeMark",
	"LinkMark",
	"TaskMarker",
	"ATXHeading1",
	"ATXHeading2",
	"ATXHeading3",
	"ATXHeading4",
	"ATXHeading5",
	"ATXHeading6"
]

// To avoid large nested mark dom elements for each attribute we mark all attributes at once
export const setNodeAttrbutes = treeIterator(({ node, builder, view }) => {
	const { name, from, to } = node
	const inRange = isNodeWithInRanges(view.state, from, to)

	const attributes: Record<string, string> = {}

	if (allowedClassNames.includes(node.name)) {
		attributes.class = `cm-${toKebab(node.name)}`
	}

	const preview = previewClassNames.get(name)
	if (preview && !inRange) {
		attributes.class = attributes.class ? attributes.class + preview : preview
		console.log({ name, class: attributes.class })
	}

	if (node.name === "TaskMarker") {
		attributes["data-checked"] = getNodeTaskStatus(node, view)
	}

	if (Object.keys(attributes).length > 0) {
		builder.add(node.from, node.to, Decoration.mark({ attributes }))
	}
})
