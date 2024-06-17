import { StyleSheet, View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Colors from "../utils/Colors";
import { fetchFile, downloadFile } from "../utils/ServerRequests";
import { FileCardType} from "../types/FileTypes";


const pdfPreviewImage = require("../../assets/pdf-icon.png");
const noPreviewImage = require("../../assets/basic-file-icon.png");


const FileCard = (props: FileCardType) => {
    const [previewImage, setPreviewImage] = useState<{ uri: string | any }>();
    const [fileType, setFileType] = useState<string>("unknown");

    useEffect(() => {
        // Choose preview image (choices: PDF default, preview image from URL, placeholder image)
        if (props.fileType === "application/pdf") {
            setPreviewImage(pdfPreviewImage);
            setFileType("pdf");
        }
        else if (props.fileType.split("/")[0] === "image") {
            const fetchImage = async () => {
                try {
                    const base64Image = await fetchFile(props.fileURL);
                    setPreviewImage({ uri: base64Image });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchImage();
            setFileType("image");
        }
        else {
            setPreviewImage(noPreviewImage);
        }
    }, [props.fileType, props.fileURL]);

    return (
        <View style={styles.container}>
            <Image
                style={fileType === "image" ? styles.filePreview : styles.pdfPreview}
                source={previewImage}
                resizeMode="contain"
            />
            <View style={styles.fileInfos}>
                <Text style={styles.fileName}>{props.fileName.replace("%", " ")}</Text>
                <View style={styles.tagPlaceHolder} />
            </View>
            <TouchableOpacity onPress={() => {
                downloadFile(props.fileURL)
            }}>
                <Entypo name="dots-three-vertical" size={24} color={Colors.primary} />
            </TouchableOpacity>
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
        paddingLeft: 10,
        gap: 10,
    },
    filePreview: {
        flex: 1,
        aspectRatio: 1,
        objectFit: "cover",
        borderRadius: 3,
    },
    pdfPreview: {
        flex: 1,
        height: 35,
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
