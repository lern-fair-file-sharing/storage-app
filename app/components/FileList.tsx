import { useNavigation } from "expo-router";
import { Key } from "react";
import { StyleSheet, View, Text } from "react-native";
import FileCard, { FileCardType } from "./FileCard";
import FolderCard, { FolderCardType } from "./FolderCard";


interface FileListType {
    folders: FolderCardType[],
    files: FileCardType[],
}


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
                    filePreviewURL={fileData.filePreviewURL}
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
    },
});

export default FileList;