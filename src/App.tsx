import React, { useState } from 'react';
import { withReact, Slate, Editable, useSelected, RenderElementProps, useSlate } from "slate-react";
import { createEditor, Descendant } from "slate";
import { CustomElement, CustomText } from "../slate-types/slate";
import { insertIcon, withIcons } from "./icon-plugin";
import "./App.css";

// placeholder for empty text w/o line break
export const EMPTY_CHARACTER = String.fromCharCode(parseInt("2060", 16));
export const EMPTY_TEXT: CustomText = {
  text: EMPTY_CHARACTER,
};

const initialValue: Descendant[] = [{
  type: "paragraph",
  children: [{text: EMPTY_CHARACTER}],
}];

function App() {
  const [editor] = useState(withIcons(withReact(createEditor())));

  const onChange = (value: Descendant[]) => {
    console.log(value);
  }

  return (
    <Slate editor={editor} value={initialValue} onChange={onChange}>
      <Toolbar/>
      <Editable
        renderElement={props => <RenderedElement {...props} />}

        placeholder="Enter some text..."
      />
    </Slate>
  );
}

const RenderedElement = (props: RenderElementProps): JSX.Element => {
  switch (props.element.type) {
    case "icon":
      return <Icon {...props} />
    default:
      return (
        <span {...props.attributes}>
          {props.children}
        </span>
      );
  }
}

const Icon: React.FC<RenderElementProps> = ({
                                              attributes,
                                              children,
                                              element,
                                            }) => {
  const isSelected = useSelected();

  return (
    <span
      {...attributes}
      style={{
        display: "inline",
        background: isSelected ? "blue" : undefined,
      }}
    >
      {children}
      <i
        contentEditable={false}
        className={`fa-solid fa-${(element as CustomElement).icon}`}
        style={{
          display: "inline",
        }}
      />
    </span>
  );
};

const Toolbar: React.FC = () => {
  const editor = useSlate();
  return (
    <div className={"toolbar"}>
      <button className={"toolbar-button"} onClick={() => insertIcon(editor)}>Insert Icon</button>
    </div>
  )
}

export default App;
