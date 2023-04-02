import React, { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";

import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

import "../styles/editor.scss";

const symbols = ["∨", "∧", "¬", "→", "↔"];

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  let bar = [];
  symbols.forEach((sym) => {
    bar.push(
      <button
        onClick={() => editor.chain().focus().insertContent(sym).run()}
        disabled={!editor.can().chain().focus().insertContent(sym).run()}
        className={"menubutton"}
        key={sym}
      >
        {sym}
      </button>
    );
  });

  return <>{bar}</>;
};

const EmpoweredText = Text.extend({
  addKeyboardShortcuts() {
    return {
      "Control-Shift-1": () =>
        this.editor.chain().focus().insertContent(symbols[0]).run(),
      "Control-Shift-2": () =>
        this.editor.chain().focus().insertContent(symbols[1]).run(),
      "Control-Shift-3": () =>
        this.editor.chain().focus().insertContent(symbols[2]).run(),
      "Control-Shift-4": () =>
        this.editor.chain().focus().insertContent(symbols[3]).run(),
      "Control-Shift-5": () =>
        this.editor.chain().focus().insertContent(symbols[4]).run(),
    };
  },
});

export default function Editor({ enterCallback }) {
  const [editor, setEditor] = useState();

  const EnterHandler = Extension.create({
    name: "enter_handle",

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("eventHandler"),
          props: {
            handleKeyDown: (view, event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                enterCallback(view);
                return true;
              }
            },
          },
        }),
      ];
    },
  });

  let e = useEditor({
    extensions: [Document, Paragraph, EmpoweredText, History, EnterHandler],
    autofocus: "start",
    content: ``,
  });
  if (editor == null && e != null) {
    setEditor(e);
  }
  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
