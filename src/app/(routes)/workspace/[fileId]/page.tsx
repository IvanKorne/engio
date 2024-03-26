import React, { useEffect, useState, useCallback } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import Canvas from "../_components/Canvas";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { File } from "@/assets/types";

const Workspace = ({ params }: any) => {
  const [save, setSave] = useState(false);
  const [fileData, setFileData] = useState<File | any>();
  const convex = useConvex();

  const getFileData = useCallback(async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
  }, [convex, params.fileId]);

  useEffect(() => {
    params.fileId && getFileData();
  }, [params.fileId, getFileData]);

  return (
    <div>
      <WorkspaceHeader onSave={() => setSave(!save)} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen border-r">
          <Editor
            onSaveTrigger={save}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
        <div className="h-screen">
          <Canvas
            onSaveTrigger={save}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
