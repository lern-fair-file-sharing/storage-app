export interface FolderCardType {
    folderName: string,
    folderURL: string,
}

export interface FileCardType {
    fileName: string,
    fileType: string,
    fileURL: string,
    tags: string[],
    lastModified: string
}

export interface FileListType {
    folders: FolderCardType[],
    files: FileCardType[],
}