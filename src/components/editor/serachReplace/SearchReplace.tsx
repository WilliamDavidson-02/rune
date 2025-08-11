import { useEffect, useState, type FC } from "react"
import { getSearchQuery, SearchQuery, setSearchQuery } from "@codemirror/search"
import { EditorSelection } from "@codemirror/state"
import { EditorView, runScopeHandlers } from "@codemirror/view"

import { Replace } from "./Replace"
import { Search } from "./Search"

export type SearchReplaceProps = {
	view: EditorView
}

export type Query = {
	search: string
	replace: string
	caseSensitive: boolean
	regexp: boolean
	wholeWord: boolean
}

export type Matches =
	| {
			count: number
			current: number
	  }
	| undefined

export type ActionMethod = (target: EditorView) => boolean

const defaultQuery: Query = {
	search: "",
	replace: "",
	caseSensitive: false,
	regexp: false,
	wholeWord: false
}

export const SearchReplace: FC<SearchReplaceProps> = ({ view }) => {
	const [query, setQuery] = useState<Query>(defaultQuery)
	const [matches, setMatches] = useState<Matches>()

	useEffect(() => {
		// Editor state still has the prev query when closed there for we load that query when we open the serach component
		const editorQuery = getSearchQuery(view.state)
		const initalQuery = { ...query }

		for (const [key, value] of Object.entries(editorQuery)) {
			const correctKey = key as keyof typeof initalQuery

			if (correctKey in initalQuery) {
				// @ts-ignore
				initalQuery[correctKey] = value
			}
		}

		const matchQuery = getSearchQuery(view.state)
		if (matchQuery.search) {
			setMatches(getSearchMatches(matchQuery, view))
		}

		setQuery(initalQuery)
	}, [])

	const getSearchMatches = (query: SearchQuery, view: EditorView) => {
		const cursor = query.getCursor(view.state)
		const counter = { count: 0, current: 0 }

		const { from, to } = view.state.selection.main

		let item = cursor.next()
		while (!item.done) {
			if (item.value.from === from && item.value.to === to) {
				counter.current = counter.count + 1
			}

			item = cursor.next()
			counter.count++
		}

		return counter
	}

	const handleSearchQuery = (newQuery: Query) => {
		setQuery(newQuery)

		const newSearchQuery = new SearchQuery(newQuery)

		view.dispatch({ effects: setSearchQuery.of(newSearchQuery) })

		// By default codemirror search does not go to the first match it only highlights it when setting a searchQuery
		const query = getSearchQuery(view.state)
		const cursor = query.getCursor(view.state)

		if (!newQuery.search) {
			setMatches(undefined)
			return
		}
		if (!cursor.next()) return

		// @ts-ignore - Value does not seam to be defined in the type but are in the actual cursor object
		const from = cursor.value.from ?? 0
		// @ts-ignore
		const to = cursor.value.to ?? 0

		view.dispatch({
			selection: EditorSelection.single(from, to),
			userEvent: "select.search"
		})

		view.dispatch({
			effects: EditorView.scrollIntoView(from, { y: "center" })
		})

		setMatches(getSearchMatches(query, view))
	}

	const handleKeyDown = (
		ev: React.KeyboardEvent<HTMLDivElement>,
		view: EditorView
	) => {
		// Since the panel is out of the scope of the editor we check if the command is in the scope of the serach panel keybindings
		if (runScopeHandlers(view, ev.nativeEvent, "search-panel")) {
			ev.preventDefault()
			const query = getSearchQuery(view.state)
			setMatches(getSearchMatches(query, view))
		}
	}

	const handleActionMethods = (method: ActionMethod) => {
		method(view)

		// Since all of the above method happens outside of a serachQuer we have to check for matches after running a method
		const query = getSearchQuery(view.state)
		setMatches(getSearchMatches(query, view))
	}

	return (
		<div
			className="flex flex-col gap-1 p-2 relative bg-light-base-800 dark:bg-dark-base-800 border-light-base-700 dark:border-dark-base-700 border rounded-br-sm"
			onKeyDown={(ev) => handleKeyDown(ev, view)}
		>
			<Search
				query={query}
				matches={matches}
				view={view}
				handleSearchQuery={handleSearchQuery}
				handleActionMethods={handleActionMethods}
			/>
			<Replace
				query={query}
				handleSearchQuery={handleSearchQuery}
				handleActionMethods={handleActionMethods}
			/>
		</div>
	)
}
