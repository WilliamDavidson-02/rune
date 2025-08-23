import { Decoration } from "@codemirror/view"

import { toKebab } from "@lib/textTransformation"

import { getNodeTaskStatus } from "./task"
import { treeIterator } from "./viewPlugin"

const allowedClassNames = ["InlineCode", "CodeMark", "LinkMark", "TaskMarker"]

// To avoid large nested mark dom elements for each attribute we mark all attributes at once
export const setNodeAttrbutes = treeIterator(({ node, builder, view }) => {
	const attributes: Record<string, string> = {}

	if (allowedClassNames.includes(node.name)) {
		attributes.class = `cm-${toKebab(node.name)}`
	}

	if (node.name === "TaskMarker") {
		attributes["data-checked"] = getNodeTaskStatus(node, view)
	}

	if (Object.keys(attributes).length > 0) {
		builder.add(node.from, node.to, Decoration.mark({ attributes }))
	}
})
