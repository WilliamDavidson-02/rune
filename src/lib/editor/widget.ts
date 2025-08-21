import { WidgetType } from "@codemirror/view"

import { parseMarkdown } from "./markdown"

export class Widget extends WidgetType {
	private content: string

	constructor(content: string) {
		super()
		this.content = content
	}

	toDOM(): HTMLElement {
		const container = document.createElement("div")
		const preview = parseMarkdown(this.content)
		container.innerHTML = preview.value.toString()
		return container
	}

	ignoreEvent(): boolean {
		return false
	}
}
