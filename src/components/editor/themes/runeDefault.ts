import { tags as t } from "@lezer/highlight"

import { createTheme, type CreateThemeOptions } from "@lib/theme"

export const defaultSettingsRuneLight: CreateThemeOptions["settings"] = {
	background: "var(--color-light-base-900)",
	foreground: "var(--color-light-base-000)",
	selection: "var(--color-light-cyan-400)",
	selectionMatch: "var(--color-light-orange-300)",
	gutterBackground: "var(--color-light-base-900)",
	gutterForeground: "var(--color-light-yellow-500)",
	inlineCodeForegorund: "var(--color-light-yellow-200)",
	inlineCodeBackground: "var(--color-light-yellow-400)"
}

export const runeLightStyle: CreateThemeOptions["styles"] = [
	{ tag: [t.quote], color: "var(--colo-light-base-000)" },
	{ tag: [t.comment], color: "var(--color-light-base-500)" },
	{
		tag: [t.bracket, t.propertyName, t.meta, t.heading],
		color: "var(--color-light-orange-200)"
	},
	{
		tag: [t.className, t.variableName, t.atom],
		color: "var(--color-light-yellow-300)"
	},
	{
		tag: [t.attributeName, t.number, t.string, t.bool],
		color: "var(--color-light-cyan-300)"
	},
	{
		tag: [
			t.keyword,
			t.typeName,
			t.typeOperator,
			t.typeName,
			t.operator,
			t.name
		],
		color: "var(--color-light-green-300)"
	},
	{ tag: [t.regexp], color: "var(--color-light-cyan-200)" },
	{ tag: [t.strong], fontWeight: "bold" },
	{
		tag: [t.emphasis],
		fontStyle: "italic"
	},
	{
		tag: t.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [t.strong, t.emphasis, t.strikethrough],
		color: "var(--colo-light-base-000)"
	},
	{
		tag: t.link,
		color: "var(--color-light-blue-300)",
		textDecoration: "underline"
	}
]

export const runeLightInit = () => {
	return createTheme({
		theme: "light",
		settings: defaultSettingsRuneLight,
		styles: runeLightStyle
	})
}

export const runeLight = runeLightInit()

export const defaultSettingsRuneDark: CreateThemeOptions["settings"] = {
	background: "var(--color-dark-base-900)",
	foreground: "var(--color-dark-base-000)",
	selection: "var(--color-dark-cyan-400)",
	selectionMatch: "var(--color-dark-orange-300)",
	gutterBackground: "var(--color-dark-base-900)",
	gutterForeground: "var(--color-dark-yellow-500)",
	inlineCodeForegorund: "var(--color-dark-yellow-200)",
	inlineCodeBackground: "var(--color-dark-yellow-400)"
}

export const runeDarkStyle: CreateThemeOptions["styles"] = [
	{ tag: [t.quote], color: "var(--colo-dark-base-000)" },
	{ tag: [t.comment], color: "var(--color-dark-base-500)" },
	{
		tag: [t.bracket, t.propertyName, t.meta, t.heading],
		color: "var(--color-dark-orange-200)"
	},
	{
		tag: [t.className, t.variableName, t.atom],
		color: "var(--color-dark-yellow-300)"
	},
	{
		tag: [t.attributeName, t.number, t.string, t.bool],
		color: "var(--color-dark-cyan-300)"
	},
	{
		tag: [
			t.keyword,
			t.typeName,
			t.typeOperator,
			t.typeName,
			t.operator,
			t.name
		],
		color: "var(--color-dark-green-300)"
	},
	{ tag: [t.regexp], color: "var(--color-dark-cyan-200)" },
	{ tag: [t.strong], fontWeight: "bold" },
	{
		tag: [t.emphasis],
		fontStyle: "italic"
	},
	{
		tag: t.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [t.strong, t.emphasis, t.strikethrough],
		color: "var(--colo-dark-base-000)"
	},
	{
		tag: t.link,
		color: "var(--color-dark-blue-300)",
		textDecoration: "underline"
	}
]

export const runeDarkInit = () => {
	return createTheme({
		theme: "dark",
		settings: defaultSettingsRuneDark,
		styles: runeDarkStyle
	})
}

export const runeDark = runeDarkInit()
