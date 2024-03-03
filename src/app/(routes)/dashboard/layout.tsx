"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";

type TChildren = {
  children: Readonly<React.ReactNode>;
};

const DashboardLayout = ({ children }: TChildren) => {
  const { user }: any = useKindeBrowserClient();
  // shortcut for useQuery/useMutation
  const convex = useConvex();
  // once an action is down, reroute user to different page
  const router = useRouter();

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
  }, [user]);

  return (
    <div className="grid grid-cols-4">
      <div>
        <Sidebar />
      </div>
      <div className="grid grid-cols-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
