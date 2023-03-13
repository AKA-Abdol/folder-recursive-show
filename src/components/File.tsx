import { useSetRecoilState } from "recoil";
import { FolderData, IDirectory } from "../interfaces";
import { mainFolderAtom } from "../atoms";

interface IFile extends IDirectory {
  name: string;
}
export default function File({ name, parentDir }: IFile) {
  const setMainFolder = useSetRecoilState(mainFolderAtom);
  const onDelete = () => {
    console.log("man injam");

    const pathList = parentDir?.split("\t") ?? [];
    console.log("in data E:", pathList);

    setMainFolder((mainFolderData) => {
      const newMainFolderData: FolderData = {
        ...mainFolderData,
        folders: [],
      };
      console.log(newMainFolderData);
      let currentMainFolderData = mainFolderData;
      for (let i = 1; i < pathList.length; i++) {
        const nextFolderName = pathList[i];
        newMainFolderData.folders = currentMainFolderData.folders.filter(
          (subFolder) => subFolder.name !== nextFolderName
        );
        currentMainFolderData = currentMainFolderData.folders.filter(
          (subFolder) => subFolder.name === nextFolderName
        )[0];
        newMainFolderData.folders.push(currentMainFolderData);
      }
      parentFolder.files = parentFolder.files.filter(
        (filename) => filename !== name
      );
      return parentFolder;
    });
  };
  return (
    <div className="text-lg hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
      <div>
        <p>{name}</p>
      </div>
      <div className="flex flex-row text-xs">
        <p
          className="invisible group-hover:visible hover:text-red-500 cursor-pointer"
          onClick={onDelete}
        >
          delete
        </p>
      </div>
    </div>
  );
}
