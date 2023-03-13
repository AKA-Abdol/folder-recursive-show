import { FolderData } from "../interfaces";
import File from "./File";

interface IFolder {
  data: FolderData;
}
export default function Folder({ data }: IFolder) {
  return (
    <div className="flex flex-col">
      <p>{data.name}</p>
      <div className="ml-4">
        {data.folders.map((folderData) => (
          <Folder data={folderData} />
        ))}

        {data.files.map((filename) => (
          <File name={filename} />
        ))}
      </div>
    </div>
  );
}
