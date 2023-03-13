import { FolderData } from "../interfaces";
import File from "./File";

interface IFolder {
  data: FolderData;
  wrapperStyle?: string;
}
export default function Folder({ data, wrapperStyle }: IFolder) {
  return (
    <div className={`flex flex-col text-lg w-fit ${wrapperStyle}`}>
      <div className="hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
        <div>
          <p>{data.name}</p>
        </div>
        <div className="flex flex-row text-xs space-x-2 invisible group-hover:visible">
          <p>+folder</p>
          <p>+file</p>
        </div>
      </div>
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
