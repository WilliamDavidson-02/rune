import { WidgetType } from "@codemirror/view"

import { parseMarkdown } from "./markdown"

export class Widget extends WidgetType {
	private content: string

	constructor(content: string) {
		super()
		this.content = content
	}

	toDOM(): HTMLElement {
		const container = document.createElement("span")
		container.classList.add("cm-widget-container")
		const preview = parseMarkdown(this.content)
		container.innerHTML = preview.toString()
		return container
	}

	ignoreEvent(): boolean {
		return false
	}
}
