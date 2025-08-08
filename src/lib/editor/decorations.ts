import { Decoration } from "@codemirror/view"

import { toKebab } from "@lib/textTransformation"

import { treeIterator } from "./viewPlugin"

const allowedNodeNames = ["InlineCode", "CodeMark"]

export const setNodeClassName = treeIterator(({ node, builder }) => {
	if (allowedNodeNames.includes(node.name)) {
		builder.add(
			node.from,
			node.to,
			Decoration.mark({ attributes: { class: `cm-${toKebab(node.name)}` } })
		)
	}
})
