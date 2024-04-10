"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../icon.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateTeam = () => {
  const [team, setTeam] = useState("");
  const { user }: any = useKindeBrowserClient();

  const router = useRouter();

  const createTeam = useMutation(api.teams.createTeam);

  const createNewTeam = () => {
    createTeam({
      teamName: team,
      createdBy: user?.email,
    }).then((resp) => {
      if (resp) {
        router.push("/dashboard");
        // Sends a popup, Toaster placed in root layout
        toast("Teams Created Successfully");
      }
    });
  };
  return (
    <div className="py-3 px-5 flex flex-col gap-10">
      <Image src={logo} alt="logo" height={150} width={150} />
      <div className="flex flex-col items-center mt-8 gap-2">
        <h2 className="text-4xl font-bold py-3">
          Create your own Custom Team!
        </h2>
        <p className="text-lg py-3">You can later customize it at anytime!</p>
      </div>
      <div className="flex flex-col items-center gap-10">
        <Input
          placeholder="Create Team..."
          className="w-auto focus:outline-none"
          onChange={(e) => setTeam(e.target.value)}
          value={team}
        ></Input>
        <Button
          className="bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-500 px-10 transition duration-300"
          disabled={!(team && team.length > 0)}
          onClick={createNewTeam}
        >
          Add Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
