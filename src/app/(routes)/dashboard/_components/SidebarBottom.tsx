import React, { useState } from "react";
import { Flag, Github, Archive } from "lucide-react";
import { MenuItem } from "@/assets/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { maxFreeFiles } from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";

const SidebarBottom = ({ createFile, totalFiles }: any) => {
  const menuList: MenuItem[] = [
    {
      id: 1,
      name: "Getting Started",
      path: "",
      icon: Flag,
    },
    {
      id: 2,
      name: "Github",
      path: "",
      icon: Github,
    },
    {
      id: 3,
      name: "Archive",
      path: "",
      icon: Archive,
    },
  ];

  const [fileInput, setFileInput] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        {menuList.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1 p-2 text-xs hover:bg-gray-300 transition duration-300 rounded-lg cursor-pointer"
          >
            <item.icon />
            {item.name}
          </div>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-3  bg-blue-500 transiton duration-300 hover:bg-blue-600">
              New File
            </Button>
          </DialogTrigger>
          {totalFiles < maxFreeFiles.MAX_FREE_FILE ? (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                  <Input
                    placeholder="Enter File Name"
                    className="mt-3"
                    onChange={(e) => setFileInput(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 transition duration-300"
                    disabled={fileInput.length < 4}
                    onClick={() => createFile(fileInput)}
                  >
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : (
            <PricingDialog />
          )}
        </Dialog>
      </div>
      <div className="h-4 w-full bg-gray-300 rounded-lg">
        <div
          className={`h-4 bg-pink-600 rounded-lg`}
          style={{ width: `${(totalFiles / 5) * 100}%` }} // Style
        ></div>
      </div>
      <h2 className="text-xs ">
        <strong>{totalFiles}</strong> out of{" "}
        <strong>{maxFreeFiles.MAX_FREE_FILE} </strong>
        files used
      </h2>
      <h2 className="font-bold text-sm">Upgrade for unlimited access</h2>
    </div>
  );
};

export default SidebarBottom;
