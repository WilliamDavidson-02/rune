import type { Completion, CompletionContext } from "@codemirror/autocomplete"

const url = import.meta.env.VITE_GITHUB_BASE_URL
const dev = import.meta.env.VITE_DEV

export type GithubEmojis = Record<string, string>

let emojis: GithubEmojis | null = null

const cleanEmojiLabel = (label: string) => {
	let newLabel = label
	const char = "+"

	if (newLabel.includes(char)) {
		newLabel = newLabel.replaceAll(char, "")
	}

	return newLabel
}

const addEmojiCssClasses = (emojis: GithubEmojis) => {
	const style = document.createElement("style")
	let css = ""

	Object.entries(emojis).forEach(([key, value]) => {
		const className = `.cm-completionIcon-emoji-${cleanEmojiLabel(key)}`
		css += `
			${className} {
				background-image: url(${value});
				background-size: contain;
				background-repeat: no-repeat;
                height: 0.8em;
			}
		`
	})

	style.textContent = css
	document.head.appendChild(style)
}

export const getEmojis = async () => {
	try {
		const res = await fetch(`${url}/emojis`)
		emojis = await res.json()

		if (emojis !== null) {
			addEmojiCssClasses(emojis) // Codemirror requries css classes forea each type of icon
		}
	} catch (error: unknown) {
		if (dev) {
			console.error(error)
			throw new Error("Error getting github emojis")
		}
	}
}

const formatEmojiesToCompletion = (emojis: GithubEmojis): Completion[] => {
	return Object.keys(emojis).map((key) => {
		return {
			label: `:${key}:`,
			type: `emoji-${cleanEmojiLabel(key)}`
		}
	})
}

export const emojiCompletion = (context: CompletionContext) => {
	if (emojis === null) return null
	const word = context.matchBefore(/:\w*/)

	if (!word || (word.from === word.to && !context.explicit)) {
		return null
	}

	return {
		from: word.from,
		options: formatEmojiesToCompletion(emojis)
	}
}
