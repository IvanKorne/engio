"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { api } from "../../../../../convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { WorkplaceType } from "@/assets/types";

const Canvas = ({ onSaveTrigger, fileId, fileData }: WorkplaceType) => {
  const convex = useConvex();
  const [whiteboard, setWhiteboard] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteboard),
    }).then((resp) => {
      console.log(resp);
    });
  };

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);

  return (
    <div className="h-[650px]">
      {fileData && (
        <Excalidraw
          initialData={{
            elements: fileData.whiteboard && JSON.parse(fileData.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteboard(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Hints.HelpHint />
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};

export default Canvas;
