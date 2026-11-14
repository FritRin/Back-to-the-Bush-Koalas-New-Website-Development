import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaListUl,
    FaListOl,
    FaLink,
} from "react-icons/fa";

function TextEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
        ],

        content,

        editorProps: {
            attributes: {
                class:
                    "prose max-w-none focus:outline-none min-h-[450px] p-6",
            },
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("Enter URL");

        if (!url) return;

        editor
            .chain()
            .focus()
            .setLink({ href: url })
            .run();
    };

    const buttonStyle = (active) =>
        `
      px-3
      py-2
      rounded-md
      border
      transition
      flex
      items-center
      justify-center
      ${active
            ? "bg-green-600 text-white border-green-600"
            : "bg-white hover:bg-gray-100"
        }
    `;

    return (
        <div className="border rounded-xl overflow-hidden shadow-sm">

            {/* Toolbar */}

            <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50">

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("bold")
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                >
                    <FaBold />
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("italic")
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                >
                    <FaItalic />
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("underline")
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                >
                    <FaUnderline />
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("heading", {
                            level: 1,
                        })
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                >
                    H1
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("heading", {
                            level: 2,
                        })
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    H2
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("heading", {
                            level: 3,
                        })
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                >
                    H3
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("bulletList")
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                >
                    <FaListUl />
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("orderedList")
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                >
                    <FaListOl />
                </button>

                <button
                    type="button"
                    className={buttonStyle(
                        editor.isActive("link")
                    )}
                    onClick={addLink}
                >
                    <FaLink />
                </button>
            </div>

            {/* Editor */}

            <EditorContent
                editor={editor}
                className="bg-white"
            />
        </div>
    );
}

export default TextEditor;