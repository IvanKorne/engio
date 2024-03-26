"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { FileListContext } from "@/app/_context/FileListContext";

type TChildren = {
  children: Readonly<React.ReactNode>;
};

const DashboardLayout = ({ children }: TChildren) => {
  const { user }: any = useKindeBrowserClient();
  // shortcut for useQuery/useMutation
  const convex = useConvex();
  // once an action is down, reroute user to different page
  const router = useRouter();

  const [fileList, setFileList] = useState();

  // check for team/teams, if empty, create team
  const checkTeam = async () => {
    const res = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!res?.length) {
      router.push("teams/create");
    }
  };

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
