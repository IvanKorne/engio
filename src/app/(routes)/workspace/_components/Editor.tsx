import React, { useEffect, useRef, useState, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import Header from "@editorjs/header";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
//@ts-ignore
import Warning from "@editorjs/warning";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { File, WorkplaceType } from "@/assets/types";

const template = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Editor = ({ onSaveTrigger, fileId, fileData }: WorkplaceType) => {
  const ref = useRef<EditorJS>();
  const [doc, setDoc] = useState(template);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editor",
      data: fileData.document ? JSON.parse(fileData.document) : template,
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header!",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+C",
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+P",
        },
        warning: Warning,
      },
    });
    ref.current = editor;
  };

  const updateDocument = useMutation(api.files.updateDocument);

  const saveDocument = useCallback(() => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          }).then(
            (resp) => {
              toast("Document Saved!");
            },
            (e) => {
              toast("Server Error");
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  }, [fileId, updateDocument]);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData, initEditor]);

  useEffect(() => {
    onSaveTrigger && saveDocument();
  }, [onSaveTrigger, saveDocument]);

  return (
    <div>
      <div id="editor" className="ml-4"></div>
    </div>
  );
};

export default Editor;
