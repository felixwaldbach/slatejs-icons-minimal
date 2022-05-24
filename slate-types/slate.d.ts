// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type ElementType = "icon" | "paragraph";
type CustomElement = { type: ElementType; icon?: string; children: (CustomText | CustomElement)[] }
type CustomText = { text: string; }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
