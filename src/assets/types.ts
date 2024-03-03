import { LucideIcon } from "lucide-react";

export type Team = {
  createdBy: string;
  teamName: string;
  _id: string;
};

export type MenuItem = {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
};
