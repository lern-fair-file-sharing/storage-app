import { StyleSheet, View, Text, Image, Pressable, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../utils/Colors";


const pdfPreviewImage = require("../../assets/folder-icon.png");



export interface FolderCardType {
    folderName: string,
    folderURL: string,
}

interface FolderNavigationType extends FolderCardType {
    navigation?: any
}


const FolderCard = (props: FolderNavigationType) => {
    const handleFolderPress = () => {
        props.navigation.push("Folder", { folderURL: props.folderURL, folderName: props.folderName });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => { handleFolderPress() }}
        >
            <Image style={styles.folderIcon} source={pdfPreviewImage} resizeMode="contain" />
            <Text style={styles.folderName}>{props.folderName}</Text>
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
        height: "50%",
        borderRadius: 3,
    },
    folderName: {
        flex: 7,
        fontSize: 15,
        color: Colors.primary,
    },
});

export default FolderCard;