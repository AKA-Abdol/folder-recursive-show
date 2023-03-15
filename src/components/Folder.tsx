import { useRecoilState } from "recoil";
import { IDirectory } from "../interfaces";
import {
  FolderActionBarState,
  FolderData,
  FolderShowSubItemsState,
} from "../interfaces/folder";
import File from "./File";
import { mainFolderAtom } from "../atoms";
import { useState } from "react";
import { useFormik } from "formik";
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";

interface IFolder extends IDirectory {
  data: FolderData;
  wrapperStyle?: string;
}
export default function Folder({ data, wrapperStyle, parentDir }: IFolder) {
  const [mainFolderData, setMainFolder] = useRecoilState(mainFolderAtom);
  const [actionBarState, setActionBarState] =
    useState<FolderActionBarState>("Normal");
  const [subItemsShowState, setSubItemsShowState] =
    useState<FolderShowSubItemsState>("Show");
  const createNameFormik = useFormik({
    initialValues: {
      inputName: "",
    },
    onSubmit: ({ inputName }, { resetForm }) => {
      if (inputName) {
        const { newData, parent } = getParentDir();
        const currentFolder =
          parent.folders.filter((folder) => folder.name === data.name)[0] ??
          parent;

        if (
          actionBarState === "CreateFile" &&
          !currentFolder.files.includes(inputName)
        )
          onCreateFile(inputName);
        if (
          actionBarState === "CreateFolder" &&
          !currentFolder.folders
            .map((folder) => folder.name)
            .includes(inputName)
        )
          onCreateFolder(inputName);
        setSubItemsShowState("Show");
        resetForm();
      }
      setActionBarState("Normal");
    },
  });
  const getParentDir = () => {
    const pathList = parentDir?.split("\t") ?? [];

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
    return {
      newData: newMainFolderData,
      parent: currentFolder,
    };
  };
  const onDelete = () => {
    const { newData, parent } = getParentDir();
    parent.folders = parent.folders.filter(
      (folder) => folder.name !== data.name
    );
    setMainFolder(newData);
  };

  const onCreateFolder = (folderName: string) => {
    const { newData, parent } = getParentDir();
    const currentFolder =
      parent.folders.filter((folder) => folder.name === data.name)[0] ?? parent;
    const newFolder: FolderData = {
      name: folderName,
      files: [],
      folders: [],
    };
    currentFolder.folders = [...currentFolder.folders, newFolder];
    setMainFolder(newData);
  };

  const onCreateFile = (filename: string) => {
    const { newData, parent } = getParentDir();
    const currentFolder =
      parent.folders.filter((folder) => folder.name === data.name)[0] ?? parent;
    currentFolder.files = [...currentFolder.files, filename];
    setMainFolder(newData);
  };

  return (
    <div className={`flex flex-col text-lg w-fit ${wrapperStyle}`}>
      <div className="hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
        <div
          className="flex flex-row space-x-1 items-center cursor-pointer"
          onClick={() =>
            setSubItemsShowState((currState) =>
              currState === "Show" ? "Hidden" : "Show"
            )
          }
        >
          {subItemsShowState === "Hidden" ? (
            <IoIosArrowDropright />
          ) : (
            <IoIosArrowDropdown />
          )}
          <p>{data.name}</p>
        </div>
        <>
          {actionBarState === "Normal" ? (
            <div
              key={"action-bar-normal"}
              className="flex flex-row text-xs space-x-2 invisible group-hover:visible"
            >
              <p
                className="cursor-pointer hover:text-green-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setActionBarState("CreateFolder");
                }}
              >
                +folder
              </p>
              <p
                className="cursor-pointer hover:text-green-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setActionBarState("CreateFile");
                }}
              >
                +file
              </p>
              <p
                className={`hover:text-red-500 cursor-pointer ${
                  !parentDir && "hidden"
                }`}
                onClick={onDelete}
              >
                delete
              </p>
            </div>
          ) : (
            <div
              key={"action-bar"}
              className="flex flex-row text-xs space-x-2 items-center"
            >
              <form onSubmit={createNameFormik.handleSubmit}>
                <input
                  id="inputName"
                  name="inputName"
                  type="text"
                  placeholder=""
                  className="input input-bordered input-xs border-red-400 w-24"
                  onChange={createNameFormik.handleChange}
                  value={createNameFormik.values.inputName}
                />
              </form>
              <div className="flex flex-row space-x-1">
                <button
                  className="btn btn-success btn-square btn-xs px-0"
                  onClick={() => createNameFormik.handleSubmit()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                </button>
                <button
                  className="btn btn-error btn-square btn-xs px-0"
                  onClick={() => setActionBarState("Normal")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      </div>
      <div
        className={`flex flex-row ${
          subItemsShowState === "Hidden" ? "hidden" : "block"
        }`}
      >
        <div className="w-4 border-l-2 border-gray-400"></div>
        <div>
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
    </div>
  );
}
