import type { FC } from "react"
import { closeSearchPanel, findNext, findPrevious } from "@codemirror/search"
import type { EditorView } from "@codemirror/view"
import { HoverCardTrigger } from "@radix-ui/react-hover-card"
import {
	ArrowDown,
	ArrowUp,
	CaseSensitive,
	Regex,
	WholeWord,
	X
} from "lucide-react"

import { Button } from "@components/core/Button"
import { HoverCard, HoverCardContent } from "@components/core/HoverCard"
import { Input } from "@components/core/Input"
import { Text } from "@components/core/Text"
import { ToggleButton } from "@components/ui/ToggleButton"

import { ActionField, InputField } from "./Fields"
import type { ActionMethod, Matches, Query } from "./SearchReplace"

type SearchProps = {
	query: Query
	matches: Matches
	view: EditorView
	handleSearchQuery: (newQuery: Query) => void
	handleActionMethods: (method: ActionMethod) => void
}

export const Search: FC<SearchProps> = (props) => {
	const { query, handleSearchQuery, handleActionMethods, matches, view } = props
	return (
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
						handleSearchQuery({ ...query, search: ev.target.value })
					}
					className="flex-grow text-sm p-0"
				/>
				<HoverCard>
					<HoverCardTrigger asChild>
						<ToggleButton
							aria-label="Toggle case sensitive"
							size={20}
							onClick={() =>
								handleSearchQuery({
									...query,
									caseSensitive: !query.caseSensitive
								})
							}
						>
							<CaseSensitive size={16} />
						</ToggleButton>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text>Case sensitive</Text>
					</HoverCardContent>
				</HoverCard>
				<HoverCard>
					<HoverCardTrigger asChild>
						<ToggleButton
							aria-label="Toggle whole word"
							size={20}
							onClick={() =>
								handleSearchQuery({ ...query, wholeWord: !query.wholeWord })
							}
						>
							<WholeWord size={16} />
						</ToggleButton>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text>Whole word</Text>
					</HoverCardContent>
				</HoverCard>
				<HoverCard>
					<HoverCardTrigger asChild>
						<ToggleButton
							aria-label="Toggle regexp"
							size={20}
							onClick={() =>
								handleSearchQuery({ ...query, regexp: !query.regexp })
							}
						>
							<Regex size={16} />
						</ToggleButton>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text>Regexp</Text>
					</HoverCardContent>
				</HoverCard>
			</InputField>
			<div className="flex justify-between gap-4 ml-2">
				{matches && (
					<Text className="text-sm my-auto w-fit">{`${matches.current} of ${matches.count}`}</Text>
				)}
				<ActionField>
					<HoverCard>
						<HoverCardTrigger asChild>
							<Button onClick={() => handleActionMethods(findPrevious, view)}>
								<ArrowUp size={16} />
							</Button>
						</HoverCardTrigger>
						<HoverCardContent>
							<Text>Find previous</Text>
						</HoverCardContent>
					</HoverCard>

					<HoverCard>
						<HoverCardTrigger asChild>
							<Button onClick={() => handleActionMethods(findNext, view)}>
								<ArrowDown size={16} />
							</Button>
						</HoverCardTrigger>
						<HoverCardContent>
							<Text>Find next</Text>
						</HoverCardContent>
					</HoverCard>

					<HoverCard>
						<HoverCardTrigger asChild>
							<Button onClick={() => closeSearchPanel(view)}>
								<X size={16} />
							</Button>
						</HoverCardTrigger>
						<HoverCardContent>
							<Text>Close search</Text>
						</HoverCardContent>
					</HoverCard>
				</ActionField>
			</div>
		</div>
	)
}
