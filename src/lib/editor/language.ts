import { go } from "@codemirror/lang-go"
import { less } from "@codemirror/lang-less"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { php } from "@codemirror/lang-php"
import { python } from "@codemirror/lang-python"
import { sass } from "@codemirror/lang-sass"
import { sql } from "@codemirror/lang-sql"
import { vue } from "@codemirror/lang-vue"
import type { LanguageSupport } from "@codemirror/language"
import { languages } from "@codemirror/language-data"

export const languageSupport: LanguageSupport[] = [
	markdown({
		base: markdownLanguage,
		codeLanguages: languages,
		addKeymap: true
	}),
	sql({ upperCaseKeywords: true }),
	php(),
	vue(),
	python(),
	sass(),
	less(),
	go()
]
