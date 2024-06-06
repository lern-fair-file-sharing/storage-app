import { useNavigation } from "expo-router";
import { Key } from "react";
import { StyleSheet, View } from "react-native";
import { FileCardType, FolderCardType, FileListType } from "../types/FileTypes";
import FileCard from "./FileCard";
import FolderCard from "./FolderCard";



const FileList = (props: FileListType) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {props.folders.map((folderData: FolderCardType, idx: Key | null | undefined) => (
                <FolderCard
                    key={idx}
                    folderName={folderData.folderName}
                    folderURL={folderData.folderURL}
                    navigation={navigation}
                />
            ))}
            {props.files.map((fileData: FileCardType, idx: Key | null | undefined) => (
                <FileCard
                    key={idx}
                    fileName={fileData.fileName}
                    fileType={fileData.fileType}
                    fileURL={fileData.fileURL}
                    lastModified={fileData.lastModified}
                    tags={fileData.tags}
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