import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FileCardType, FolderCardType, FileListType } from "../types/FileTypes";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";




const FileList = (props: FileListType) => {
    const navigation = useNavigation();

    const [files, setFiles] = useState<FileCardType[]>([]);
    const [folders, setFolders] = useState<FolderCardType[]>([]);

    const PERSONAL_SPACE_FOLDER_NAME = "Persönliche Ablage";

    // Moves the "personal space" folder to the very top if it exists
    const personalFolderToTop = (folders: FolderCardType[]) => {
        const index = folders.findIndex(folder => decodeURIComponent(folder.folderName) === PERSONAL_SPACE_FOLDER_NAME);

        if (index !== -1) {
            const [personalSpaceFolder] = folders.splice(index, 1);
            folders.unshift(personalSpaceFolder);
        }

        return folders;
    }

    useEffect(() => {
        setFiles(props.files);
        const rearrangedFolders = personalFolderToTop(props.folders);
        setFolders(rearrangedFolders);
        
    }, [props.files, props.folders]);

    const cardRemovalHandler = () => {
        props.refreshFunction ? props.refreshFunction() : null
    }

    return (
        <View style={styles.container}>
            {folders.map((folderData: FolderCardType) => (
                <FolderCard
                    key={folderData.folderURL}
                    folderName={folderData.folderName}
                    folderURL={folderData.folderURL}
                    navigation={navigation}
                />
            ))}
            {files.map((fileData: FileCardType) => (
                <FileCard
                    key={fileData.fileURL}
                    fileName={fileData.fileName}
                    fileType={fileData.fileType}
                    fileURL={fileData.fileURL}
                    lastModified={fileData.lastModified}
                    tags={fileData.tags}
                    cardRemovalHandler={cardRemovalHandler}
                />
            ))}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: "100%",
        display: "flex",
        gap: 7,
        marginBottom: 30,   
    },
});

export default FileList;