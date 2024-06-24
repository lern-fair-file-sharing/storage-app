import { StyleSheet, View, Text, Image, TouchableOpacity, ToastAndroid, Platform, Alert, Pressable, Modal } from "react-native";
import Popover from "react-native-popover-view";
import { Entypo } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Colors from "../utils/Colors";
import { fetchFile, downloadFile, deleteItem } from "../utils/ServerRequests";
import { FileCardType} from "../types/FileTypes";


const pdfPreviewImage = require("../../assets/pdf-icon.png");
const noPreviewImage = require("../../assets/basic-file-icon.png");


interface FileCardProps extends FileCardType {
    cardRemovalHandler: () => void
}


const FileCard = (props: FileCardProps) => {
    const [previewImage, setPreviewImage] = useState<{ uri: string | any }>();
    const [fileType, setFileType] = useState<string>("unknown");
    const [settingsPopupVisible, setSettingsPopupVisible] = useState<boolean>(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);

    useEffect(() => {
        // Choose preview image (choices: PDF default, preview image from URL, placeholder image)
        if (props.fileType === "application/pdf") {
            setPreviewImage(pdfPreviewImage);
            setFileType("pdf");
        }
        else if (props.fileType.split("/")[0] === "image") {
            
            fetchImage();
            setFileType("image");
        }
        else {
            setPreviewImage(noPreviewImage);
        }
    }, [props.fileType, props.fileURL]);

    const fetchImage = () => {
        fetchFile(props.fileURL)
            .then(base64Image => {
                setPreviewImage({ uri: base64Image });
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    const handleDownloadFile = () => {
        downloadFile(props.fileURL)
            .then(status => {
                setSettingsPopupVisible(false);
            })
            .catch(error => {
                console.error('Download File Error:', error);
                Alert.alert("Download Failed", "An unexpected error occurred while downloading the file.");
            });
    };

    const handleDeleteFile = () => {
        deleteItem(props.fileURL)
            .then(_ => {
                setSettingsPopupVisible(false);
                if (Platform.OS === "android") {
                    ToastAndroid.show("File deleted!", ToastAndroid.SHORT);
                } else {
                    Alert.alert("File deleted!");
                }
                props.cardRemovalHandler();
            })
            .catch(error => {
                Alert.alert("Deletion Failed!", `An error occurred while deleting the file.`);
            })
    };

    const displayFile = () => {
      if (Platform.OS === "ios") {
        setIsPreviewVisible(true);
      }
    };    

    return (
        <TouchableOpacity style={styles.container} onPress={displayFile}>
            <Image
                style={fileType === "image" ? styles.filePreview : styles.pdfPreview}
                source={previewImage}
                resizeMode="contain"
            />
            <View style={styles.fileInfos}>
                <Text style={styles.fileName}>{decodeURIComponent(props.fileName)}</Text>
                <View style={styles.tagPlaceHolder} />
            </View>

            <Popover
                isVisible={settingsPopupVisible}
                onRequestClose={() => setSettingsPopupVisible(false)}
                animationConfig={{
                    duration: 300
                }}
                from={(
                    <TouchableOpacity style={styles.openSettingsButton} onPress={() => setSettingsPopupVisible(true)}>
                        <Entypo name="dots-three-vertical" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                )}>
                <View style={styles.settingModal}>
                    <TouchableOpacity style={styles.settingButton} onPress={() => handleDownloadFile()}>
                        <Feather name="download" size={25} color={Colors.primary} />
                        <Text style={styles.settingText}>DOWNLOAD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingButton} onPress={() => handleDeleteFile()}>
                        <AntDesign name="delete" size={25} color={Colors.primary} />
                        <Text style={styles.settingText}>LÖSCHEN</Text>
                    </TouchableOpacity>
                </View>
            </Popover>
            {Platform.OS === "ios" && (
              <Modal visible={isPreviewVisible} animationType="slide">
                {fileType === "image" ? (
                  <Image
                    style={styles.imagePreview}
                    source={previewImage}
                  />
                ) : (
                  <Text>Error</Text>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsPreviewVisible(false)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </Modal>
      )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        alignItems: "center",
        minHeight: 60,
        width: "100%",
        borderRadius: 3,
        borderWidth: 0,
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
        backgroundColor: "#dfdfdf",
        height: 20,
    },
    fileName: {
        flex: 1,
        fontSize: 15,
        color: Colors.primary,
    },
    openSettingsButton: {
        flex: 1,
        alignItems: "center",
    },
    settingModal: {
        width: 250,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10
    },
    settingButton: {
        flex: 1,
        borderRadius: 3,
        height: 75,
        backgroundColor: Colors.surface,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    settingText: {
        fontWeight: "bold",
        color: Colors.primary,
        fontSize: 17
    },
    closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      backgroundColor: Colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 5,
    },
    closeButtonText: {
      color: Colors.surface,
      fontWeight: "bold",
    },
    imagePreview: {
      flex: 1,
      resizeMode: 'contain'
    }
});

export default FileCard;
