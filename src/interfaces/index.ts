export interface IDirectory {
  parentDir?: string;
}
export interface FolderData {
  name: string;
  folders: Array<FolderData>;
  files: Array<string>;
}
