import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import logo from "../../../icon.png";
import { ChevronDown, Settings, Users, LogOut, LayoutGrid } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Team, MenuItem } from "@/assets/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SidebarTop = ({ user, setCurrentTeamInfo }: any) => {
  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  const convex = useConvex();
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>();
  const [currentTeam, setCurrentTeam] = useState<Team>();

  const getTeams = useCallback(async () => {
    const res = await convex.query(api.teams.getTeam, { email: user?.email });
    setTeams(res);
    setCurrentTeam(res[0]);
  }, [user?.email, convex]);

  //If an item in menu has a path, go to that path when clicked
  const onMenuClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    // When user is fetched, then fetch teams
    user && getTeams();
  }, [user, getTeams]);

  useEffect(() => {
    currentTeam && setCurrentTeamInfo(currentTeam);
  }, [currentTeam, setCurrentTeamInfo]);

  // Anything in PopoverContent is in a popup
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex gap-2 items-center hover:bg-gray-300 rounded-lg cursor-pointer transition duration-300  ">
            <Image src={logo} alt="logo" height={60} width={60} />
            <h2 className="flex items-center gap-2 font-semibold text-lg">
              {currentTeam?.teamName}
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-2">
          <div className="flex flex-col gap-5">
            <div>
              {teams?.map((team) => (
                <div
                  key={team._id}
                  onClick={() => setCurrentTeam(team)}
                  className={`${
                    currentTeam?._id === team._id
                      ? "font-bold"
                      : "font-semibold"
                  } p-2 hover:bg-blue-100 transition duration-300 rounded-lg cursor-pointer mb-1`}
                >
                  {team.teamName}
                </div>
              ))}
              <Separator className="mt-2 bg-sky-200" />
            </div>
            <div className="flex flex-col gap-3">
              {menu.map((item) => (
                <div
                  onClick={() => onMenuClick(item)}
                  className="flex gap-2 cursor-pointer transition duration-300 hover:bg-gray-100 rounded-lg text-md p-2"
                  key={item.id}
                >
                  <item.icon />
                  <h2>{item.name}</h2>
                </div>
              ))}
              <LogoutLink>
                <h2 className="flex gap-2 cursor-pointer hover:bg-gray-100 rounded-lg text-md p-2">
                  <LogOut></LogOut>
                  Logout
                </h2>
              </LogoutLink>
            </div>
          </div>
          <Separator className="mt-2 bg-sky-200" />
          <div className="mt-2 flex gap-2 items-center ">
            {user && (
              <Image
                src={user?.picture}
                alt="user"
                height={25}
                width={25}
                className="rounded-full"
              ></Image>
            )}
            <div className="flex flex-col ">
              <h2 className="text-sm font-semibold">
                {user?.given_name} {user?.family_name}
              </h2>
              <h2 className="text-xs ">{user?.email}</h2>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div>
        <Button className="flex w-full gap-4 justify-start mt-8 font-bold bg-blue-500 transiton duration-300 hover:bg-blue-600">
          <LayoutGrid className="h-5 w-5" />
          All Files
        </Button>
      </div>
    </div>
  );
};

export default SidebarTop;
