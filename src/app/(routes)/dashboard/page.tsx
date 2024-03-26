"use client";
import React, { useEffect, useCallback } from "react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import FileList from "./_components/FileList";
import HeaderDashboard from "./_components/Header";

const Dashboard = () => {
  const { user }: any = useKindeBrowserClient();

  const createUser = useMutation(api.user.createUser);
  const convex = useConvex();

  const checkUser = useCallback(async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((r: any) => {
        console.log(r);
      });
    }
  }, [
    user?.email,
    user?.given_name,
    user?.email,
    user?.picture,
    createUser,
    convex,
  ]);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user, checkUser]);

  return (
    <div className="p-8">
      <HeaderDashboard />
      <FileList />
    </div>
  );
};

export default Dashboard;
