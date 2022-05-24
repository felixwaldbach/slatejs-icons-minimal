import { Editor, NodeEntry, Transforms, Node, Path, Element } from "slate";
import { CustomElement } from "../slate-types/slate";
import { EMPTY_TEXT } from "./App";

export const withIcons = (editor: Editor): Editor => {
  const {isVoid, normalizeNode} = editor;

  editor.isVoid = (element) => {
    return element.type === "icon" ? true : isVoid(element);
  };

  editor.normalizeNode = entry => {
    const [node, path] = entry as NodeEntry<CustomElement>;
    if (node.type === "icon") {
      const parentNode = Node.parent(editor, path);
      const islastChild =
        path[path.length - 1] === parentNode.children.length - 1;
      const nextPath = Path.next(path);
      if (islastChild) { // If Icon is last, insert empty character after to fix cursor
        const newNode: Element = {
          type: "paragraph",
          children: [EMPTY_TEXT],
        };

        Transforms.insertNodes(editor, newNode, {at: nextPath});
      }
      Transforms.move(editor, {
        distance: 1,
        unit: "character",
      });
    }

    normalizeNode(entry);
  };
  return editor;
};

export const insertIcon = (editor: Editor): void => {
  const icon: Element = {
    type: "icon",
    children: [EMPTY_TEXT],
    icon: "anchor",
  };
  Transforms.insertNodes(editor, icon);
};
