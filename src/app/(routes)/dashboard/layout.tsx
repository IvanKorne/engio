"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";

type TChildren = {
  children: Readonly<React.ReactNode>;
};

const DashboardLayout = ({ children }: TChildren) => {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
  };
  useEffect(() => {}, []);
  return <div>{children}</div>;
};

export default DashboardLayout;
