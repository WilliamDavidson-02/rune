import { useEffect } from "react"
import { Compartment } from "@codemirror/state"
import { create } from "zustand"

import type { Theme } from "@lib/theme"

type ThemeStoreState = { theme: Theme; themeCompartment: Compartment }

type ThemeStoreAction = {
	setTheme: (newTheme: Theme) => void
}

type ThemeStore = ThemeStoreState & ThemeStoreAction

export const getInitalTheme = (): Theme => {
	document.documentElement.classList.toggle(
		"dark",
		localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
	)

	return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: getInitalTheme(),
	themeCompartment: new Compartment(), // Used to toggle light and dark theme extensions for codemirror state
	setTheme: (newTheme) => set({ theme: newTheme })
}))

export const useThemeMathMedia = () => {
	const { setTheme } = useThemeStore()

	useEffect(() => {
		const mp = window.matchMedia("(prefers-color-scheme: dark)")

		const handleMathMedia = () => {
			if (!("theme" in localStorage)) {
				setTheme(mp.matches ? "dark" : "light")
			}
		}

		mp.addEventListener("change", handleMathMedia)

		return () => {
			mp.removeEventListener("change", handleMathMedia)
		}
	}, [])
}
