import type { Completion, CompletionContext } from "@codemirror/autocomplete"
import { EditorSelection, Transaction } from "@codemirror/state"
import type { EditorView } from "@codemirror/view"

import { getTooltipIconCss } from "./tooltip"

const BASE_ICON_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"
const languages: Record<string, string> = {
	bash: `${BASE_ICON_URL}/bash/bash-original.svg`,
	c: `${BASE_ICON_URL}/c/c-original.svg`,
	cpp: `${BASE_ICON_URL}/cplusplus/cplusplus-original.svg`,
	csharp: `${BASE_ICON_URL}/csharp/csharp-original.svg`,
	css: `${BASE_ICON_URL}/css3/css3-original.svg`,
	dart: `${BASE_ICON_URL}/dart/dart-original.svg`,
	diff: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	dockerfile: `${BASE_ICON_URL}/docker/docker-original.svg`,
	go: `${BASE_ICON_URL}/go/go-original.svg`,
	graphql: `${BASE_ICON_URL}/graphql/graphql-plain.svg`,
	html: `${BASE_ICON_URL}/html5/html5-original.svg`,
	ini: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	java: `${BASE_ICON_URL}/java/java-original.svg`,
	js: `${BASE_ICON_URL}/javascript/javascript-original.svg`,
	json: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	jsx: `${BASE_ICON_URL}/react/react-original.svg`,
	kotlin: `${BASE_ICON_URL}/kotlin/kotlin-original.svg`,
	less: `${BASE_ICON_URL}/less/less-plain-wordmark.svg`,
	lua: `${BASE_ICON_URL}/lua/lua-original.svg`,
	markdown: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	mysql: `${BASE_ICON_URL}/mysql/mysql-original.svg`,
	php: `${BASE_ICON_URL}/php/php-original.svg`,
	plsql: `${BASE_ICON_URL}/oracle/oracle-original.svg`,
	powershell: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	psql: `${BASE_ICON_URL}/postgresql/postgresql-original.svg`,
	python: `${BASE_ICON_URL}/python/python-original.svg`,
	r: `${BASE_ICON_URL}/r/r-original.svg`,
	ruby: `${BASE_ICON_URL}/ruby/ruby-original.svg`,
	rust: `${BASE_ICON_URL}/rust/rust-original.svg`,
	scss: `${BASE_ICON_URL}/sass/sass-original.svg`,
	scala: `${BASE_ICON_URL}/scala/scala-original.svg`,
	sh: `${BASE_ICON_URL}/bash/bash-original.svg`,
	sql: `${BASE_ICON_URL}/azuresqldatabase/azuresqldatabase-original.svg`,
	sqlite: `${BASE_ICON_URL}/sqlite/sqlite-original.svg`,
	swift: `${BASE_ICON_URL}/swift/swift-original.svg`,
	tsx: `${BASE_ICON_URL}/react/react-original.svg`,
	ts: `${BASE_ICON_URL}/typescript/typescript-original.svg`,
	vbnet: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	vue: `${BASE_ICON_URL}/vuejs/vuejs-original.svg`,
	xml: `${BASE_ICON_URL}/markdown/markdown-original.svg`,
	yaml: `${BASE_ICON_URL}/markdown/markdown-original.svg`
}

const addIconCssClasses = () => {
	const style = document.createElement("style")
	let css = ""

	Object.entries(languages).forEach(([language, icon]) => {
		const className = `.cm-completionIcon-language-${language}`
		css += getTooltipIconCss(className, icon)
	})

	style.textContent = css
	document.head.appendChild(style)
}

addIconCssClasses()

const applyCodeBlock = (view: EditorView, completion: Completion) => {
	const changes = view.state.changeByRange((range) => {
		const { from, to } = view.state.doc.lineAt(range.from)
		const insert = `${completion.label}\n\n\`\`\``
		const centerPos = 4

		return {
			range: EditorSelection.cursor(from + insert.length - centerPos),
			changes: [{ from, to, insert }]
		}
	})

	view.dispatch(changes, {
		annotations: Transaction.userEvent.of("input")
	})
}

const formatLanguagesToCopletion = (): Completion[] => {
	return Object.entries(languages).map(([language]) => ({
		label: `\`\`\`${language}`,
		displayLabel: language,
		type: `language-${language}`,
		apply: applyCodeBlock
	}))
}

export const fenceblockCompletion = (context: CompletionContext) => {
	const word = context.matchBefore(/```(\w*)/)

	if (!word || (word.from === word.to && !context.explicit)) {
		return null
	}

	return {
		from: word.from,
		options: formatLanguagesToCopletion()
	}
}
