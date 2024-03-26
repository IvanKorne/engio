import { FileListContext } from "@/app/_context/FileListContext";
import { File } from "@/assets/types";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive } from "lucide-react";
import { useRouter } from "next/navigation";

const FileList = () => {
  const { fileList, setFileList } = useContext(FileListContext);
  const [list, setList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList && setList(fileList);
  }, [fileList]);
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created at
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list &&
              list.map((file: File) => (
                <tr
                  className="odd:bg-gray-50 cursor-pointer hover:opacity-80"
                  onClick={() => router.push(`/workspace/${file._id}`)}
                  key={file._id}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file._creationTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                    <Image
                      src={user?.picture}
                      alt="picture"
                      height={25}
                      width={25}
                      className="rounded-full center"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="flex gap-2 items-center">
                          <Archive className="h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
