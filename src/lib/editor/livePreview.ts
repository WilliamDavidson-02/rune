import { EditorState } from "@codemirror/state"

export const WIDGET_MAP = [
	// "CodeBlock",
	// "FencedCode",
	// "Blockquote",
	// "HorizontalRule",
	// "BulletList",
	// "OrderedList",
	// "ListItem",
	"ATXHeading1",
	"ATXHeading2",
	"ATXHeading3",
	"ATXHeading4",
	"ATXHeading5",
	"ATXHeading6",
	// "SetextHeading1",
	// "SetextHeading2",
	// "HTMLBlock",
	// "LinkReference",
	// "Paragraph"
	// "CommentBlock",
	// "ProcessingInstructionBlock",

	// Inline
	// "Escape",
	// "Entity",
	// "HardBreak",
	"Emphasis",
	"StrongEmphasis",
	"Strikethrough"
	// "Link",
	// "Image",
	// "InlineCode",
	// "HTMLTag",
	// "Comment",
	// "ProcessingInstruction",
	// "Autolink",

	// Smaller tokens
	// "HeaderMark",
	// "QuoteMark",
	// "ListMark",
	// "LinkMark",
	// "EmphasisMark"
	// "CodeMark",
	// "CodeText",
	// "CodeInfo",
	// "LinkTitle",
	// "LinkLabel",
	// "URL"
]

export const isNodeWithInRanges = (
	state: EditorState,
	from: number,
	to: number
) => {
	const { selection, doc } = state

	return selection.ranges.some((range) => {
		// The node should still be included in the range if the node is on the same line as the range
		const rangeLine = doc.lineAt(range.from)
		const nodeLine = doc.lineAt(from)
		const onLine =
			rangeLine.from === nodeLine.from && rangeLine.to === nodeLine.to

		const isPartial = range.from <= to && range.to >= from

		return isPartial || onLine
	})
}
