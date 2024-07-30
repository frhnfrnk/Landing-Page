"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import { useAppDispatch } from "@/lib/store";
import { setDatabudaya } from "@/lib/features/budaya/budayaSlice";

const Tiptap = ({ onChange, content }: any) => {
  const dispatch = useAppDispatch();
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-3 py-2  justify-start border-b border-r border-l border-gray-700 text-black items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  const handleSave = (e: any) => {
    e.preventDefault();
    console.log(content);
    dispatch(setDatabudaya({ content: content }));
  };

  return (
    <div className="w-full my-2">
      <label htmlFor="content" className="mb-2">
        Content
        <span className="ml-1 text-sm text-[#ff0000]">*</span>
      </label>
      <Toolbar
        editor={editor}
        content={content}
        handleSave={(e: any) => {
          handleSave(e);
        }}
      />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
