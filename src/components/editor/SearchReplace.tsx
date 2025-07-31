import { useEffect, useState, type FC } from 'react'
import {
	closeSearchPanel,
	findNext,
	findPrevious,
	getSearchQuery,
	replaceAll,
	replaceNext,
	SearchQuery,
	setSearchQuery
} from '@codemirror/search'
import { EditorSelection } from '@codemirror/state'
import { EditorView, runScopeHandlers } from '@codemirror/view'
import {
	ArrowDown,
	ArrowUp,
	CaseSensitive,
	Regex,
	Replace,
	ReplaceAll,
	WholeWord,
	X
} from 'lucide-react'

import { Button } from '@components/core/Button'
import { Input } from '@components/core/Input'
import { Text } from '@components/core/Text'

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

type Matches = {
	count: number
	current: number
}

const InputField: FC<React.ComponentPropsWithRef<'div'>> = ({ children }) => {
	return (
		<div className="col-span-2 flex gap-2 self-center bg-white px-2 rounded-sm">
			{children}
		</div>
	)
}

const ActionField: FC<React.ComponentPropsWithRef<'div'>> = ({ children }) => {
	return <div className="ml-auto flex align-middle gap-2">{children}</div>
}

export const SearchReplace: FC<SearchReplaceProps> = ({ view }) => {
	const [query, setQuery] = useState<Query>({
		search: '',
		replace: '',
		caseSensitive: false,
		regexp: false,
		wholeWord: false
	})
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
		setMatches(getSearchMatches(matchQuery, view))

		setQuery(initalQuery)
	}, [])

	const getSearchMatches = (query: SearchQuery, view: EditorView) => {
		const cursor = query.getCursor(view.state)
		const counter = { count: 0, current: 1 }

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

	const handleSearchQuery = (newQuery: Query, view: EditorView) => {
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
			userEvent: 'select.search'
		})

		view.dispatch({
			effects: EditorView.scrollIntoView(from, { y: 'center' })
		})

		setMatches(getSearchMatches(query, view))
	}

	const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		// Since the panel is out of the scope of the editor we check if the command is in the scope of the serach panel keybindings
		if (runScopeHandlers(view, ev.nativeEvent, 'search-panel')) {
			ev.preventDefault()
			const query = getSearchQuery(view.state)
			setMatches(getSearchMatches(query, view))
		}
	}

	const handleActionMethods = (
		method: (target: EditorView) => boolean,
		view: EditorView
	) => {
		method(view)

		// Since all of the above method happens outside of a serachQuer we have to check for matches after running a method
		const query = getSearchQuery(view.state)
		setMatches(getSearchMatches(query, view))
	}

	return (
		<div className="flex flex-col gap-1 p-2" onKeyDown={handleKeyDown}>
			<div className="grid grid-cols-3">
				<InputField>
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
						className="flex-grow text-sm p-0"
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
						<CaseSensitive size={16} />
					</Button>
					<Button
						name="wholeWord"
						onClick={() =>
							handleSearchQuery({ ...query, wholeWord: !query.wholeWord }, view)
						}
					>
						<WholeWord size={16} />
					</Button>
					<Button
						name="regepx"
						onClick={() =>
							handleSearchQuery({ ...query, regexp: !query.regexp }, view)
						}
					>
						<Regex size={16} />
					</Button>
				</InputField>
				<div className="flex justify-between gap-4 ml-2">
					{matches && (
						<Text className="text-sm my-auto w-fit">{`${matches.current} of ${matches.count}`}</Text>
					)}
					<ActionField>
						<Button
							name="findPrevious"
							onClick={() => handleActionMethods(findPrevious, view)}
						>
							<ArrowUp size={16} />
						</Button>
						<Button
							name="findNext"
							onClick={() => handleActionMethods(findNext, view)}
						>
							<ArrowDown size={16} />
						</Button>
						<Button name="close" onClick={() => closeSearchPanel(view)}>
							<X size={16} />
						</Button>
					</ActionField>
				</div>
			</div>
			<div className="grid grid-cols-3">
				<InputField>
					<Input
						name="replace"
						placeholder="Replace"
						aria-label="Replace"
						value={query.replace}
						onChange={(ev) =>
							handleSearchQuery({ ...query, replace: ev.target.value }, view)
						}
						className="flex-grow text-sm p-0"
					/>
				</InputField>
				<ActionField>
					<Button
						name="replace"
						onClick={() => handleActionMethods(replaceNext, view)}
					>
						<Replace size={16} />
					</Button>
					<Button
						name="replaceAll"
						onClick={() => handleActionMethods(replaceAll, view)}
					>
						<ReplaceAll size={16} />
					</Button>
				</ActionField>
			</div>
		</div>
	)
}
