import { autocompletion } from "@codemirror/autocomplete"
import { markdownLanguage } from "@codemirror/lang-markdown"
import type { Extension } from "@codemirror/state"

import { emojiCompletion } from "./emojis"

export const completions: Extension[] = [
	autocompletion(),
	markdownLanguage.data.of({
		autocomplete: emojiCompletion
	})
]
