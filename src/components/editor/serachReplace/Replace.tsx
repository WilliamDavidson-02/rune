import { type FC } from "react"
import { replaceAll, replaceNext } from "@codemirror/search"
import { HoverCardTrigger } from "@radix-ui/react-hover-card"
import { ReplaceAll, Replace as ReplaceIcon } from "lucide-react"

import { Button } from "@components/core/Button"
import { HoverCard, HoverCardContent } from "@components/core/HoverCard"
import { Input } from "@components/core/Input"
import { Text } from "@components/core/Text"

import { ActionField, FieldWrapper, InputField } from "./Fields"
import type { ActionMethod, Query } from "./SearchReplace"

type ReplaceProps = {
	query: Query
	handleSearchQuery: (newQuery: Query) => void
	handleActionMethods: (method: ActionMethod) => void
}

export const Replace: FC<ReplaceProps> = (props) => {
	const { handleActionMethods, handleSearchQuery, query } = props

	return (
		<FieldWrapper>
			<InputField>
				<Input
					name="replace"
					placeholder="Replace"
					aria-label="Replace"
					value={query.replace}
					onChange={(ev) =>
						handleSearchQuery({ ...query, replace: ev.target.value })
					}
					className="flex-grow text-sm p-0 outline-none"
				/>
			</InputField>
			<ActionField>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button onClick={() => handleActionMethods(replaceNext)} size={20}>
							<ReplaceIcon size={16} />
						</Button>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text>Replace next</Text>
					</HoverCardContent>
				</HoverCard>

				<HoverCard>
					<HoverCardTrigger asChild>
						<Button onClick={() => handleActionMethods(replaceAll)} size={20}>
							<ReplaceAll size={16} />
						</Button>
					</HoverCardTrigger>
					<HoverCardContent>
						<Text>Replace all</Text>
					</HoverCardContent>
				</HoverCard>
			</ActionField>
		</FieldWrapper>
	)
}
