import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text, View, Platform, ToastAndroid, Alert } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { getFolderContent, uploadFile } from "../utils/ServerRequests";
import { FolderCardType, FileCardType } from "../types/FileTypes";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../utils/Colors";
import { pickFileFromDevice } from "../utils/utils";
import { PERSONAL_SPACE_FOLDER_NAME } from "../utils/utils";



export type RootStackParamList = {
    FilesTabScreen: undefined,
    FolderContentScreen: { folderURL: string, folderName: string };
};


const FolderContentScreen = (props: NativeStackScreenProps<RootStackParamList, "FolderContentScreen">) => {
    const navigation = useNavigation();

    const [isPersonalFolder, setIsPersonalFolder] = useState<boolean>(false);
    const [allFolders, setAllFolders] = useState<FolderCardType[]>([] as FolderCardType[]);
    const [allFiles, setAllFiles] = useState<FileCardType[]>([] as FileCardType[]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: decodeURI(props.route.params?.folderName),
        });
    }, [navigation]);

    useEffect(() => {
        fetchFolderContent();
        setIsPersonalFolder(
            decodeURI(props.route.params?.folderURL)
            .endsWith(`/files/${process.env.EXPO_PUBLIC_USER}/${PERSONAL_SPACE_FOLDER_NAME}/`)
        );
    }, []);


    const onRefresh = useCallback(() => {
        fetchFolderContent();
    }, []);

    const fetchFolderContent = async () => {
        const content = await getFolderContent(props.route.params?.folderURL);
        if (content) {
            setAllFiles(content.files);
            setAllFolders(content.folders);
        }
    };
    
    const uploadFileHandler = async () => {
        try {
            pickFileFromDevice().then((uploadedFileData) => {
                if (uploadedFileData) {
                    return uploadFile(uploadedFileData.blob, `${props.route.params?.folderURL}${encodeURI(uploadedFileData.fileName)}`);
                }
            }).then((status) => {
                if (status) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show("File uploaded!", ToastAndroid.SHORT);
                    }
                    else {
                        Alert.alert("File uploaded!");
                    }
                }
            }).then(async () => {
                // Refresh after 2 seconds to see new file
                setTimeout(() => {
                    fetchFolderContent();
                }, 2500)
            }).catch((error) => {
                throw error;
            });   
        }
        catch {
            Alert.alert("File upload failed!");
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.folderContent}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
                >
                <FileList folders={allFolders} files={allFiles} refreshFunction={onRefresh}/>
            </ScrollView>
            {
                isPersonalFolder ?
                    <View style={styles.uploadSection}>
                        <TouchableOpacity style={styles.uploadButton} onPress={uploadFileHandler}>
                            <Feather name="upload" size={25} color="#fff" />
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </TouchableOpacity>
                    </View>
                :
                    null
            }
            
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        gap: 7,
        padding: 20,
    },
    folderContent: {
        display: "flex",
        gap: 7,
    },
    uploadSection: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 5
    },
    uploadButton: {
        height: 45,
        width: 150,
        borderRadius: 5,
        backgroundColor: Colors.yellow,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    uploadText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 17
    }
});

export default FolderContentScreen;