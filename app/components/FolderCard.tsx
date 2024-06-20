import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { FolderCardType } from "../types/FileTypes";


const pdfPreviewImage = require("../../assets/folder-icon.png");

interface FolderCardProps extends FolderCardType {
    navigation?: any
}


const FolderCard = (props: FolderCardProps) => {
    const handleFolderPress = async() => {
        props.navigation.push("FolderContentScreen", { folderURL: props.folderURL, folderName: props.folderName });
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => { handleFolderPress() }}
        >
            <Image style={styles.folderIcon} source={pdfPreviewImage} resizeMode="contain" />
            <Text style={styles.folderName}>{decodeURIComponent(props.folderName)}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        minHeight: 60,
        width: "100%",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.surfaceOutline,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
        gap: 20,
    },
    folderIcon: {
        flex: 1,
        height: "40%",
        borderRadius: 3,
    },
    folderName: {
        flex: 7,
        fontSize: 15,
        color: Colors.primary,
    },
});

export default FolderCard;
