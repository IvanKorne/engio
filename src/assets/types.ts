import { StringToBoolean } from "class-variance-authority/types";
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

export type File = {
  fileName: string;
  createdBy: string;
  archive: boolean;
  document: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: string;
};

export type WorkplaceType = {
  onSaveTrigger: any;
  fileId: any;
  fileData: File;
};
