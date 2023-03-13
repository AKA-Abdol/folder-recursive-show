import React from "react";
import { FolderData } from "./interfaces";
import Folder from "./components/Folder";

function App() {
  return (
    <div className="w-full">
      <Folder data={mockMainFolder} wrapperStyle="px-1 bg-gray-200" />
    </div>
  );
}

const mockMainFolder: FolderData = {
  name: "main",
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

export default App;
