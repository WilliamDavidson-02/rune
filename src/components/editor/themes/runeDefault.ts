import { tags as t } from "@lezer/highlight"

import { createTheme, type CreateThemeOptions } from "@lib/theme"

export const runeStyles: CreateThemeOptions["styles"] = [
	{ tag: t.quote, color: "var(--tag-highlight-quote)" },
	{ tag: t.comment, color: "var(--tag-highlight-comment)" },

	{ tag: t.bracket, color: "var(--tag-highlight-bracket)" },
	{ tag: t.propertyName, color: "var(--tag-highlight-propertyName)" },
	{ tag: t.meta, color: "var(--tag-highlight-meta)" },
	{ tag: t.heading, color: "var(--tag-highlight-heading)" },

	{ tag: t.className, color: "var(--tag-highlight-className)" },
	{ tag: t.variableName, color: "var(--tag-highlight-variableName)" },
	{ tag: t.atom, color: "var(--tag-highlight-atom)" },

	{ tag: t.attributeName, color: "var(--tag-highlight-attributeName)" },
	{ tag: t.number, color: "var(--tag-highlight-number)" },
	{ tag: t.string, color: "var(--tag-highlight-string)" },
	{ tag: t.bool, color: "var(--tag-highlight-bool)" },

	{ tag: t.keyword, color: "var(--tag-highlight-keyword)" },
	{ tag: t.typeName, color: "var(--tag-highlight-typeName)" },
	{ tag: t.typeOperator, color: "var(--tag-highlight-typeOperator)" },
	{ tag: t.operator, color: "var(--tag-highlight-operator)" },
	{ tag: t.name, color: "var(--tag-highlight-name)" },

	{ tag: t.regexp, color: "var(--tag-highlight-regexp)" },
	{ tag: t.strong, color: "var(--tag-highlight-strong)", fontWeight: "bold" },
	{
		tag: t.emphasis,
		color: "var(--tag-highlight-emphasis)",
		fontStyle: "italic"
	},
	{
		tag: t.strikethrough,
		color: "var(--tag-highlight-strikethrough)",
		textDecoration: "line-through"
	},

	{ tag: t.url, color: "var(--tag-highlight-url)", textDecoration: "underline" }
]

export const defaultSettingsRune: CreateThemeOptions["settings"] = {
	background: "var(--cm-background)",
	foreground: "var(--cm-foreground)",
	selection: "var(--cm-selection)",
	selectionMatch: "var(--cm-selectionMatch)",
	gutterBackground: "var(--cm-gutterBackground)",
	gutterForeground: "var(--cm-gutterForeground)",
	inlineCodeForegorund: "var(--cm-inlineCodeForeground)",
	inlineCodeBackground: "var(--cm-inlineCodeBackground)",
	linkMarkForeground: "var(--cm-linkMarkForeground)",
	linkMarkDecoration: "var(--cm-linkMarkDecoration)",
	taskMarkerChecked: "var(--cm-taskMarkerChecked)",
	tooltipBackground: "var(--cm-tooltipBackground)",
	tooltipSelectedBackground: "var(--cm-tooltipSelectedBackground)"
}

export const runeLightInit = () => {
	return createTheme({
		theme: "light",
		settings: defaultSettingsRune,
		styles: runeStyles
	})
}

export const runeLight = runeLightInit()

export const runeDarkInit = () => {
	return createTheme({
		theme: "dark",
		settings: defaultSettingsRune,
		styles: runeStyles
	})
}

export const runeDark = runeDarkInit()
