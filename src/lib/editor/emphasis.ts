import {
	EditorSelection,
	Transaction,
	type ChangeSpec,
	type EditorState,
	type SelectionRange
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"

export type AllowedEmphasis = "*" | "**"

export const selectWordBoundary = (
	range: SelectionRange,
	state: EditorState
) => {
	let { from, to } = range
	const line = state.doc.lineAt(from)

	while (from > line.from) {
		if (!/\w/.test(line.text[from - line.from - 1])) break
		from--
	}

	while (to < line.to) {
		if (!/\w/.test(line.text[to - line.from])) break
		to++
	}

	return EditorSelection.range(from, to)
}

const hasSelectionEmphasis = (
	state: EditorState,
	range: SelectionRange,
	emphasis: AllowedEmphasis
) => {
	const count = emphasis.length

	const before = state.sliceDoc(range.from - count, range.from) === emphasis
	const after = state.sliceDoc(range.to, range.to + count) === emphasis

	return before && after
}

const toggleEmphasis = (
	view: EditorView,
	emphasis: AllowedEmphasis
): boolean => {
	const count = emphasis.length
	const { state } = view
	const changes = state.changeByRange((range) => {
		let newRange =
			range.from === range.to ? selectWordBoundary(range, state) : range

		const inRange = EditorSelection.range(
			newRange.from + count,
			newRange.to - count
		)
		const hasEmphasisIn = hasSelectionEmphasis(state, inRange, emphasis)
		const hasEmphasisOut = hasSelectionEmphasis(state, newRange, emphasis)

		let changes: ChangeSpec[] = []

		if (hasEmphasisIn || hasEmphasisOut) {
			changes = [
				{
					from: hasEmphasisOut ? newRange.from - count : newRange.from,
					to: hasEmphasisOut ? newRange.from : newRange.from + count
				},
				{
					from: hasEmphasisOut ? newRange.to : newRange.to - count,
					to: hasEmphasisOut ? newRange.to + count : newRange.to
				}
			]
			const selectionFrom = hasEmphasisOut ? range.from - count : range.from
			const selectionTo = hasEmphasisOut
				? range.to - count
				: range.to - count * 2
			newRange = EditorSelection.range(selectionFrom, selectionTo)
		} else {
			changes = [
				{
					from: newRange.from,
					insert: emphasis
				},
				{
					from: newRange.to,
					insert: emphasis
				}
			]
			newRange = EditorSelection.range(range.from + count, range.to + count)
		}

		return { range: newRange, changes }
	})

	view.dispatch(changes, {
		annotations: Transaction.userEvent.of("input")
	})

	return true
}

export const toggleBolde = (view: EditorView) => toggleEmphasis(view, "**")

export const toggleItalic = (view: EditorView) => toggleEmphasis(view, "*")
