export interface DirectoryObject {
  dir: string;
}
export interface FolderData {
  name: string;
  folders: Array<FolderData>;
  files: Array<string>;
}
