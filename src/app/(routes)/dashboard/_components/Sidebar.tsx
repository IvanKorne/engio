import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useContext, useEffect, useState } from "react";
import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Team } from "@/assets/types";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

const Sidebar = () => {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const [curTeam, setCurTeam] = useState<Team>();
  //This will make our file progress bar active
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList, setFileList } = useContext(FileListContext);

  const fileCreate = useMutation(api.files.createFile);

  // Create filename, toast will create popup
  const createFile = (fileName: string) => {
    if (curTeam) {
      fileCreate({
        fileName: fileName,
        teamId: curTeam?._id,
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      }).then(
        (resp: any) => {
          if (resp) {
            //This is to update the file count
            getFiles();
            toast("File Created Successfuly");
          }
        },
        () => {
          toast("Error while creating file");
        }
      );
    }
  };

  const getFiles = async () => {
    if (curTeam) {
      const result = await convex.query(api.files.getFiles, {
        teamId: curTeam?._id,
      });
      setFileList(result);
      setTotalFiles(result.length);
    }
  };

  //Update current team
  useEffect(() => {
    curTeam && getFiles();
  }, [curTeam, getFiles]);

  return (
    <div className="bg-gray-50 fixed h-screen w-72 border-r p-2 flex flex-col">
      <div className="flex-1">
        <SidebarTop
          user={user}
          setCurrentTeamInfo={(val: Team) => setCurTeam(val)}
        />
      </div>
      <div>
        <SidebarBottom createFile={createFile} totalFiles={totalFiles} />
      </div>
    </div>
  );
};

export default Sidebar;
