import { useSetRecoilState } from "recoil";
import { IDirectory, FolderData } from "../interfaces";
import File from "./File";
import { mainFolderAtom } from "../atoms";

interface IFolder extends IDirectory {
  data: FolderData;
  wrapperStyle?: string;
}
export default function Folder({ data, wrapperStyle, parentDir }: IFolder) {
  const setMainFolder = useSetRecoilState(mainFolderAtom);
  const onDelete = () => {
    const pathList = parentDir?.split("\t") ?? [];

    setMainFolder((mainFolderData) => {
      const newMainFolderData = JSON.parse(
        JSON.stringify(mainFolderData)
      ) as FolderData;
      let currentFolder = newMainFolderData;
      for (let i = 1; i < pathList.length; i++) {
        const nextFolderName = pathList[i];
        currentFolder = currentFolder.folders.filter(
          (subFolder) => subFolder.name === nextFolderName
        )[0];
      }
      currentFolder.folders = currentFolder.folders.filter(
        (folder) => folder.name !== data.name
      );
      return newMainFolderData;
    });
  };
  return (
    <div className={`flex flex-col text-lg w-fit ${wrapperStyle}`}>
      <div className="hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
        <div>
          <p>{data.name}</p>
        </div>
        <div className="flex flex-row text-xs space-x-2 invisible group-hover:visible">
          <p>+folder</p>
          <p>+file</p>
          <p
            className={`hover:text-red-500 cursor-pointer ${
              !parentDir && "hidden"
            }`}
            onClick={onDelete}
          >
            delete
          </p>
        </div>
      </div>
      <div className="ml-4">
        {data.folders.map((folderData) => (
          <Folder
            data={folderData}
            parentDir={parentDir ? `${parentDir}\t${data.name}` : data.name}
          />
        ))}

        {data.files.map((filename) => (
          <File
            name={filename}
            parentDir={parentDir ? `${parentDir}\t${data.name}` : data.name}
          />
        ))}
      </div>
    </div>
  );
}
