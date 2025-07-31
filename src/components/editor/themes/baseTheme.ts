import { EditorView } from "@codemirror/view"

//  <div class="cm-editor [theme scope classes]">
//   <div class="cm-scroller">
//     <div class="cm-content" contenteditable="true">
//       <div class="cm-line">Content goes here</div>
//       <div class="cm-line">...</div>
//     </div>
//   </div>
// </div>

export const baseTheme = EditorView.baseTheme({
	"&": {
		maxHeight: "inherit",
		height: "inherit",
		fontFamily: "'JetBrains Mono', monospace"
	},
	"&.cm-focused": {
		outline: "none"
	}
})
