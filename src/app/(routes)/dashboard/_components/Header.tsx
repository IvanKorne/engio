import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";

const HeaderDashboard = () => {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="flex justify-end w-full items-center gap-2">
      <div className="flex gap-2 items-center border rounded-md p-1">
        <Search className="h-4 w-4" />
        <Input placeholder="Search" className="focus:outline-none" />
      </div>
      <div>
        <Button className="flex gap-2 items-center bg-pink-600 hover:bg-pink-700 duration-300 transition">
          <Send /> Invite
        </Button>
      </div>
      <Image
        src={user?.picture}
        alt="user picture"
        height={30}
        width={30}
        className="rounded-full"
      />
    </div>
  );
};

export default HeaderDashboard;
