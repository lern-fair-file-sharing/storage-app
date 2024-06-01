import { Key } from "react";
import { StyleSheet, View, Text } from "react-native";
import FileCard, { FileData } from "./FileCard";


const FileList = (props: { data: FileData[] }) => {
    return (
        <View style={styles.container}>
            {props.data.map((fileData: FileData, idx: Key | null | undefined) => (
                <FileCard
                    key={idx}
                    fileName={fileData.fileName}
                    fileType={fileData.fileType}
                    fileDownloadURL={fileData.fileDownloadURL}
                    filePreviewURL={fileData.filePreviewURL}
                    uploadTime={fileData.uploadTime}
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