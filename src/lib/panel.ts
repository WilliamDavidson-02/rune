import type { ReactNode } from 'react'
import type { Panel } from '@codemirror/view'
import { createRoot } from 'react-dom/client'

export type ComponentPanel = {
	component: ReactNode
	options?: Omit<Panel, 'dom'>
	className?: string
}

export const createComponentPanel = (args: ComponentPanel): Panel => {
	const { component, options, className } = args
	const dom = document.createElement('div')
	if (className) dom.classList.add(className)

	const root = createRoot(dom)
	root.render(component)
	return { dom, ...options }
}
