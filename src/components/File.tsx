import { useSetRecoilState } from "recoil";
import { FolderData, IDirectory } from "../interfaces";
import { mainFolderAtom } from "../atoms";

interface IFile extends IDirectory {
  name: string;
}
export default function File({ name, parentDir }: IFile) {
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
      currentFolder.files = currentFolder.files.filter(
        (filename) => filename !== name
      );
      return newMainFolderData;
    });
  };
  return (
    <div className="text-lg hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
      <div>
        <p>{name}</p>
      </div>
      <div className="flex flex-row text-xs invisible group-hover:visible">
        <p
          className="hover:text-red-500 cursor-pointer"
          onClick={onDelete}
        >
          delete
        </p>
      </div>
    </div>
  );
}
