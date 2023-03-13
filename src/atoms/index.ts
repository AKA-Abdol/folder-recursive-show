import { atom } from "recoil";
import { FolderData } from "../interfaces";

const defaultMainFolder: FolderData = {
  name: "Main",
  files: ["file_1", "file_2"],
  folders: [
    {
      name: "folder_1",
      files: ["subfile_1_1", "subfile_1_2"],
      folders: [],
    },
    {
      name: "folder_2",
      files: ["subfile_2_1", "subfile_2_2"],
      folders: [],
    },
  ],
};

export const mainFolderAtom = atom({
  key: "main-folder",
  default: defaultMainFolder,
});
