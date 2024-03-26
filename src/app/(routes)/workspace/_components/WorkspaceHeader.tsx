import React from "react";
import Image from "next/image";
import logo from "../../../icon.png";
import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import { useRouter } from "next/navigation";
const WorkspaceHeader = ({ onSave }: any) => {
  const router = useRouter();
  return (
    <div className="flex gap-5 border-b p-3 items-center justify-between ">
      <div className="flex gap-1 items-center">
        <Image
          src={logo}
          alt="logo"
          height={60}
          width={60}
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer"
        />
        <h2 className="font-semibold text-md">File Name</h2>
      </div>
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => onSave()}
          className="flex gap-2 items-center bg-pink-600 hover:bg-pink-700 transition duration-300"
        >
          Save <Save className="h-4 w-4" />
        </Button>
        <Button className="flex gap-2 items-center bg-blue-600 hover:bg-blue-700 transition duration-300">
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
