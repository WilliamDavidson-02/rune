import { autocompletion } from "@codemirror/autocomplete"
import { markdownLanguage } from "@codemirror/lang-markdown"
import type { Extension } from "@codemirror/state"

import { emojiCompletion } from "./emojis"
import { fenceblockCompletion } from "./fenceblocks"

export const completions: Extension[] = [
	autocompletion(),
	markdownLanguage.data.of({
		autocomplete: emojiCompletion
	}),
	markdownLanguage.data.of({
		autocomplete: fenceblockCompletion
	})
]
