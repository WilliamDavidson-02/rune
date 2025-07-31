import { useEffect, useState, type FC } from "react"
import {
	closeSearchPanel,
	findNext,
	findPrevious,
	getSearchQuery,
	replaceAll,
	replaceNext,
	SearchQuery,
	setSearchQuery
} from "@codemirror/search"
import { EditorSelection } from "@codemirror/state"
import { EditorView, runScopeHandlers } from "@codemirror/view"

import { Button } from "@components/core/Button"
import { Input } from "@components/core/Input"

export type SearchReplaceProps = {
	view: EditorView
}

type Query = {
	search: string
	replace: string
	caseSensitive: boolean
	regexp: boolean
	wholeWord: boolean
}

export const SearchReplace: FC<SearchReplaceProps> = ({ view }) => {
	const [query, setQuery] = useState<Query>({
		search: "",
		replace: "",
		caseSensitive: false,
		regexp: false,
		wholeWord: false
	})

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

		setQuery(initalQuery)
	}, [])

	const handleSearchQuery = (newQuery: Query, view: EditorView) => {
		setQuery(newQuery)

		const newSearchQuery = new SearchQuery(newQuery)

		view.dispatch({ effects: setSearchQuery.of(newSearchQuery) })

		// By default codemirror search does not go to the first match it only highlights it when setting a searchQuery
		const query = getSearchQuery(view.state)
		const cursor = query.getCursor(view.state)

		if (!cursor.next() || !newQuery.search) return

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
	}

	const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		// Since the panel is out of the scope of the editor we check if the command is in the scope of the serach panel keybindings
		if (runScopeHandlers(view, ev.nativeEvent, "search-panel")) {
			ev.preventDefault()
		}
	}

	return (
		<div className="flex flex-col gap-1 p-2" onKeyDown={handleKeyDown}>
			<div className="grid grid-cols-3">
				<div className="col-span-2 flex gap-2 self-center">
					<Input
						name="search"
						placeholder="Find"
						aria-label="Find"
						main-field="true"
						autoFocus
						value={query.search}
						onChange={(ev) =>
							handleSearchQuery({ ...query, search: ev.target.value }, view)
						}
						className="flex-grow text-sm"
					/>
					<Button
						name="caseSensitive"
						onClick={() =>
							handleSearchQuery(
								{ ...query, caseSensitive: !query.caseSensitive },
								view
							)
						}
					>
						MC
					</Button>
					<Button
						name="wholeWord"
						onClick={() =>
							handleSearchQuery({ ...query, wholeWord: !query.wholeWord }, view)
						}
					>
						WW
					</Button>
					<Button
						name="regepx"
						onClick={() =>
							handleSearchQuery({ ...query, regexp: !query.regexp }, view)
						}
					>
						RE
					</Button>
				</div>
				<div className="ml-auto self-center">
					<Button name="findPrevious" onClick={() => findPrevious(view)}>
						&uarr;
					</Button>
					<Button name="findNext" onClick={() => findNext(view)}>
						&darr;
					</Button>
					<Button name="close" onClick={() => closeSearchPanel(view)}>
						&#10005;
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-3">
				<div className="col-span-2 flex gap-2 self-center">
					<Input
						name="replace"
						placeholder="Replace"
						aria-label="Replace"
						value={query.replace}
						onChange={(ev) =>
							handleSearchQuery({ ...query, replace: ev.target.value }, view)
						}
						className="flex-grow text-sm"
					/>
					<Button name="replace" onClick={() => replaceNext(view)}>
						RN
					</Button>
					<Button name="replaceAll" onClick={() => replaceAll(view)}>
						RA
					</Button>
				</div>
			</div>
		</div>
	)
}
