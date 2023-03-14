export interface FolderData {
  name: string;
  folders: Array<FolderData>;
  files: Array<string>;
}

export type FolderActionBarState = "CreateFile" | "CreateFolder" | "Normal";
