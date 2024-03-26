"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import FileList from "./_components/FileList";
import HeaderDashboard from "./_components/Header";

const Dashboard = () => {
  const { user }: any = useKindeBrowserClient();

  // Get user via email if exists
  const createUser = useMutation(api.user.createUser);
  const convex = useConvex();

  // Check user without recreating data
  const checkUser = async () => {
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
  };

  // If user does not exist, create the user with given email, name and image
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="p-8">
      <HeaderDashboard />
      <FileList />
    </div>
  );
};

export default Dashboard;
