import React, { useEffect, useState, useCallback } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { FileListContext } from "@/app/_context/FileListContext";

type TChildren = {
  children: Readonly<React.ReactNode>;
};

const DashboardLayout = ({ children }: TChildren) => {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();
  const [fileList, setFileList] = useState();

  const checkTeam = useCallback(async () => {
    const res = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!res?.length) {
      router.push("teams/create");
    }
  }, [user?.email, convex, router]);

  useEffect(() => {
    user && checkTeam();
  }, [user, checkTeam]);

  return (
    <FileListContext.Provider value={{ fileList, setFileList }}>
      <div className="grid grid-cols-4">
        <div className="h-screen w-64 fixed">
          <Sidebar />
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
    </FileListContext.Provider>
  );
};

export default DashboardLayout;
