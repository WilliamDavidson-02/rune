import {
	HighlightStyle,
	syntaxHighlighting,
	type TagStyle
} from "@codemirror/language"
import { type Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { classHighlighter } from "@lezer/highlight"
import type { StyleSpec } from "types/style"

export type Theme = "light" | "dark"

export type Settings = {
	background?: string
	foreground?: string
	selection?: string
	selectionMatch?: string
	gutterBackground?: string
	gutterForeground?: string
	gutterBorder?: string
	inlineCodeBackground?: string
	inlineCodeForegorund?: string
	linkMarkForeground?: string
	linkMarkDecoration?: string
	taskMarkerChecked?: string
	tooltipBackground?: string
	tooltipForeground?: string
	tooltipSelectedBackground?: string
}

export type CreateThemeOptions = {
	theme: Theme
	settings: Settings
	styles: TagStyle[]
}

export const createTheme = ({
	theme,
	settings = {},
	styles = []
}: CreateThemeOptions): Extension => {
	const themeOptions: Record<string, StyleSpec> = {
		".cm-gutter": {},
		".cm-gutters": {},
		".cm-link-mark span": {}
	}
	const baseStyle: StyleSpec = {}

	if (settings.background) {
		baseStyle.backgroundColor = settings.background
	}
	if (settings.foreground) {
		baseStyle.color = settings.foreground
	}
	if (settings.background || settings.foreground) {
		themeOptions["&"] = baseStyle
	}

	if (settings.gutterBackground) {
		themeOptions[".cm-gutters"].backgroundColor = settings.gutterBackground
	}
	if (settings.gutterForeground) {
		themeOptions[".cm-gutters"].color = settings.gutterForeground
	}
	if (settings.gutterBorder) {
		themeOptions[".cm-gutters"].borderRightColor = settings.gutterBorder
	}

	if (settings.selection) {
		themeOptions[
			"&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"
		] = {
			background: settings.selection + " !important"
		}
	}
	if (settings.selectionMatch) {
		themeOptions["& .cm-selectionMatch"] = {
			backgroundColor: settings.selectionMatch
		}
	}

	if (settings.inlineCodeBackground) {
		const target = ".cm-inline-code, .cm-inline-code .cm-code-mark span"
		themeOptions[target] = {
			...themeOptions[target],
			background: settings.inlineCodeBackground + "!important"
		}
	}

	if (settings.inlineCodeForegorund) {
		const target = ".cm-inline-code, .cm-inline-code .cm-code-mark span"
		themeOptions[target] = {
			...themeOptions[target],
			color: settings.inlineCodeForegorund + "!important"
		}
	}

	if (settings.linkMarkForeground) {
		themeOptions[".cm-link-mark span"].color =
			settings.linkMarkForeground + "!important"
	}

	if (settings.linkMarkDecoration) {
		themeOptions[".cm-link-mark span"].textDecoration =
			settings.linkMarkDecoration
	}

	if (settings.taskMarkerChecked) {
		themeOptions['.cm-task-marker[data-checked="true"] span'] = {
			color: settings.taskMarkerChecked + "!important"
		}
	}

	if (settings.tooltipBackground) {
		const target = ".cm-tooltip.cm-tooltip-autocomplete"
		themeOptions[target] = {
			...themeOptions[target],
			background: settings.tooltipBackground
		}
	}

	if (settings.tooltipForeground) {
		const target = ".cm-tooltip.cm-tooltip-autocomplete"
		themeOptions[target] = {
			...themeOptions[target],
			background: settings.tooltipForeground
		}
	}

	if (settings.tooltipSelectedBackground) {
		themeOptions[
			'.cm-tooltip.cm-tooltip-autocomplete li[aria-selected="true"]'
		] = {
			background: settings.tooltipSelectedBackground
		}
	}

	const themeExtension = EditorView.theme(themeOptions, {
		dark: theme === "dark"
	})

	const highlightStyle = HighlightStyle.define(styles)
	const extension = [
		themeExtension,
		syntaxHighlighting(highlightStyle),
		syntaxHighlighting(classHighlighter)
	]

	return extension
}
