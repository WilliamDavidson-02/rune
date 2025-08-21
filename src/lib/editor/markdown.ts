import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

// This assures that we are using the same plugins for all markdown parsing
export const parseMarkdown = (value: string) => {
	return unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeHighlight)
		.use(rehypeStringify)
		.processSync(value)
}
