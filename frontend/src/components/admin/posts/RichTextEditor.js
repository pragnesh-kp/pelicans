"use client";

import { useEditor, useEditorState, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import Image from "@tiptap/extension-image";
import {
  Bold, Italic, Underline, Strikethrough, Heading2, Heading3, List, ListOrdered,
  Quote, Code2, Link2, Unlink, Minus, Undo2, Redo2,
} from "lucide-react";
import styles from "./RichTextEditor.module.css";

// Rich-text editor (TipTap). Value in and out is HTML.
export default function RichTextEditor({ id, value, onChange, labelledBy }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Placeholder.configure({ placeholder: "Start writing…" }),
      // Keeps images in posts (e.g. imported from WordPress) when they are edited and saved
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: value || "",
    immediatelyRender: false, // required with server rendering
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
    editorProps: {
      attributes: {
        id,
        class: styles.content,
        role: "textbox",
        "aria-multiline": "true",
        ...(labelledBy && { "aria-labelledby": labelledBy }),
      },
    },
  });

  // Which toolbar buttons are "on" for the current selection
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e
        ? {
            bold: e.isActive("bold"),
            italic: e.isActive("italic"),
            underline: e.isActive("underline"),
            strike: e.isActive("strike"),
            h2: e.isActive("heading", { level: 2 }),
            h3: e.isActive("heading", { level: 3 }),
            bulletList: e.isActive("bulletList"),
            orderedList: e.isActive("orderedList"),
            blockquote: e.isActive("blockquote"),
            codeBlock: e.isActive("codeBlock"),
            link: e.isActive("link"),
            canUndo: e.can().undo(),
            canRedo: e.can().redo(),
          }
        : {},
  });

  function setLink() {
    const previous = editor.getAttributes("link").href || "";
    const input = window.prompt("Link URL (leave empty to remove the link):", previous);
    if (input === null) return; // cancelled
    const url = input.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    const href = /^(https?:|mailto:|tel:|\/)/i.test(url) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  const run = (fn) => () => fn(editor.chain().focus()).run();

  const buttons = [
    { label: "Bold", icon: Bold, active: state.bold, onClick: run((c) => c.toggleBold()) },
    { label: "Italic", icon: Italic, active: state.italic, onClick: run((c) => c.toggleItalic()) },
    { label: "Underline", icon: Underline, active: state.underline, onClick: run((c) => c.toggleUnderline()) },
    { label: "Strikethrough", icon: Strikethrough, active: state.strike, onClick: run((c) => c.toggleStrike()) },
    "divider",
    { label: "Heading", icon: Heading2, active: state.h2, onClick: run((c) => c.toggleHeading({ level: 2 })) },
    { label: "Subheading", icon: Heading3, active: state.h3, onClick: run((c) => c.toggleHeading({ level: 3 })) },
    "divider",
    { label: "Bulleted list", icon: List, active: state.bulletList, onClick: run((c) => c.toggleBulletList()) },
    { label: "Numbered list", icon: ListOrdered, active: state.orderedList, onClick: run((c) => c.toggleOrderedList()) },
    { label: "Quote", icon: Quote, active: state.blockquote, onClick: run((c) => c.toggleBlockquote()) },
    { label: "Code block", icon: Code2, active: state.codeBlock, onClick: run((c) => c.toggleCodeBlock()) },
    { label: "Divider line", icon: Minus, onClick: run((c) => c.setHorizontalRule()) },
    "divider",
    { label: state.link ? "Edit link" : "Add link", icon: Link2, active: state.link, onClick: setLink },
    ...(state.link
      ? [{ label: "Remove link", icon: Unlink, onClick: run((c) => c.extendMarkRange("link").unsetLink()) }]
      : []),
    "divider",
    { label: "Undo", icon: Undo2, disabled: !state.canUndo, onClick: run((c) => c.undo()) },
    { label: "Redo", icon: Redo2, disabled: !state.canRedo, onClick: run((c) => c.redo()) },
  ];

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
        {buttons.map((b, i) =>
          b === "divider" ? (
            <span key={`d${i}`} className={styles.divider} aria-hidden="true" />
          ) : (
            <button
              key={b.label}
              type="button"
              className={`${styles.button} ${b.active ? styles.active : ""}`}
              // Keep the cursor in the editor so typing continues right after a click
              onMouseDown={(e) => e.preventDefault()}
              onClick={b.onClick}
              disabled={!editor || b.disabled}
              aria-pressed={b.active === undefined ? undefined : Boolean(b.active)}
              aria-label={b.label}
              title={b.label}
            >
              <b.icon size={18} aria-hidden="true" />
            </button>
          )
        )}
      </div>
      {editor ? <EditorContent editor={editor} /> : <div className={styles.content} aria-hidden="true" />}
    </div>
  );
}
