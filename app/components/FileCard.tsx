import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Colors from "../utils/Colors";
import { searchLatestFiles } from "../utils/ServerRequests";
import { FileCardType, FolderCardType, FileListType } from "../types/FileTypes";

const pdfPreviewImage = require("../../assets/pdf-icon.png");
const noPreviewImage = require("../../assets/icon.png");


const FileCard = (props: FileCardType) => {
    const [previewImage, setPreviewImage] = useState<{ uri: string | any }>();


    useEffect(() => {
        // Choose preview image (choices: PDF default, preview image from URL, placeholder image)
        if (props.fileType === "application/pdf") {
            setPreviewImage(pdfPreviewImage);
        }
        else if (props.fileType === "image/jpg" || props.fileType === "image/png") {
            setPreviewImage({ uri: props.fileURL });
        }
        else {
            setPreviewImage(noPreviewImage);
        }
    }, [props.fileType, props.fileURL]);

    return (
        <View style={styles.container}>
            <Image style={styles.filePreview} source={previewImage} resizeMode="contain" />
            <View style={styles.fileInfos}>
                <Text style={styles.fileName}>{props.fileName}</Text>
                <View style={styles.tagPlaceHolder} />
            </View>
            <Pressable>
                <Entypo name="dots-three-vertical" size={24} color={Colors.primary} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        alignItems: "center",
        minHeight: 60,
        width: "100%",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.surfaceOutline,
        display: "flex",
        flexDirection: "row",
        padding: 5,
        gap: 20,
    },
    filePreview: {
        flex: 1,
        height: "75%",
        borderRadius: 3,
    },
    fileInfos: {
        flex: 6,
        display: "flex",
        gap: 5,
    },
    tagPlaceHolder: {
        flex: 1,
        backgroundColor: "#cfcfcf",
        height: 20,
    },
    fileName: {
        fontSize: 15,
        color: Colors.primary,
    },
});

export default FileCard;
