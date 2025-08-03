import {
	HighlightStyle,
	syntaxHighlighting,
	type TagStyle
} from "@codemirror/language"
import { type Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import type { StyleSpec } from "types/style"

type Theme = "light" | "dark"

export type Settings = {
	background?: string
	foreground?: string
	selection?: string
	selectionMatch?: string
	gutterBackground?: string
	gutterForeground?: string
	gutterBorder?: string
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
		".cm-gutters": {}
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
	const themeExtension = EditorView.theme(themeOptions, {
		dark: theme === "dark"
	})

	const highlightStyle = HighlightStyle.define(styles)
	const extension = [themeExtension, syntaxHighlighting(highlightStyle)]

	return extension
}
