import { syntaxTree } from "@codemirror/language"
import {
	EditorState,
	RangeSetBuilder,
	StateField,
	type SelectionRange
} from "@codemirror/state"
import { Decoration, EditorView } from "@codemirror/view"

import { Widget } from "./widget"

export const WIDGET_MAP = [
	"ATXHeading1",
	"ATXHeading2",
	"ATXHeading3",
	"ATXHeading4",
	"ATXHeading5",
	"ATXHeading6",
	// "Blockquote",
	// "FencedCode",
	// "IndentedCode",
	// "CodeInfo",
	// "CodeText",
	// "InlineCode",
	// "Link",
	// "LinkMark",
	// "URL",
	// "Image",
	// "ImageMark",
	"Emphasis",
	// "StrongEmphasis",
	// "ListItem",
	// "BulletList",
	// "OrderedList",
	// "HorizontalRule",
	// "Table",
	// "TableRow",
	// "TableHeader",
	// "TableCell",
	// "TaskMarker",
	"Strikethrough"
]

export const isNodeWithInRanges = (
	ranges: readonly SelectionRange[],
	from: number,
	to: number
) => {
	return ranges.some((range) => range.from <= to && range.to >= from)
}

export const getFullLineRange = (state: EditorState, range: SelectionRange) => {
	const fromLine = state.doc.lineAt(range.from)
	const toLine = state.doc.lineAt(range.to)

	return { from: fromLine.from, to: toLine.to }
}
