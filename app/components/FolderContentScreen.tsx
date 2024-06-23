import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text, View, Platform, ToastAndroid, Alert, TextInput, Modal } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { getFolderContent, uploadFile, createFolder } from "../utils/ServerRequests";
import { FolderCardType, FileCardType } from "../types/FileTypes";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { PERSONAL_SPACE_FOLDER_NAME, pickFileFromDevice } from "../utils/utils";
import Popover from "react-native-popover-view";


export type RootStackParamList = {
    FilesTabScreen: undefined,
    FolderContentScreen: { folderURL: string, folderName: string };
};


const FolderContentScreen = (props: NativeStackScreenProps<RootStackParamList, "FolderContentScreen">) => {
    const navigation = useNavigation();

    const [isPersonalFolder, setIsPersonalFolder] = useState<boolean>(false);
    const [allFolders, setAllFolders] = useState<FolderCardType[]>([] as FolderCardType[]);
    const [allFiles, setAllFiles] = useState<FileCardType[]>([] as FileCardType[]);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: decodeURI(props.route.params?.folderName),
        });
    }, [navigation]);

    useEffect(() => {
        fetchFolderContent();
        setIsPersonalFolder(
            decodeURI(props.route.params?.folderURL)
            .includes(`/files/${process.env.EXPO_PUBLIC_USER}/${PERSONAL_SPACE_FOLDER_NAME}/`)
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

    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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
                setSettingsPopupVisible(false);
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
            Alert.alert("Failed to upload file!");
        }
    }

    const addFolderHandler = async () => {
        try {
            await createFolder(`${props.route.params?.folderURL}/${inputText}`).then((status) => {
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
            Alert.alert("Failed to add folder!");
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
                    <Popover
                        isVisible={settingsPopupVisible}
                        onRequestClose={() => setSettingsPopupVisible(false)}
                        animationConfig={{
                            duration: 300
                        }}
                        from={(
                            <TouchableOpacity style={styles.uploadButton} onPress={() => setSettingsPopupVisible(true)}>
                                <Feather name="plus" size={40} color="#fff" />
                            </TouchableOpacity>
                    )}>
                        <View style={styles.settingModal}>
                            <TouchableOpacity style={styles.settingButton} onPress={() => uploadFileHandler()}>
                                <AntDesign name="addfolder" size={25} color={Colors.primary} />
                                <Text style={styles.settingText}>NEUE DATEI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.settingButton} onPress={() => {
                                setTimeout(() => {
                                    // For some reason iOS needs a second before it registers the modal.
                                    // If we don't wait the modal is invisible.
                                    setModalVisible(true)
                                }, 1000)
                                setSettingsPopupVisible(false);
                            }}>
                                <AntDesign name="addfile" size={25} color={Colors.primary} />
                                <Text style={styles.settingText}>NEUER ORDNER</Text>
                            </TouchableOpacity>
                        </View>
                    </Popover>
                :
                    null
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <TouchableOpacity
                            style={styles.closeModal}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Feather name="x" size={20} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Ordner Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Wähle einen Ordner Namen..."
                            value={inputText}
                            onChangeText={(text: string) => {
                                setInputText(text);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.addFolderButton}
                            onPress={() => {
                                setModalVisible(false);
                                addFolderHandler();
                                setInputText("");
                            }}
                        >
                            <Feather name="plus" size={20} color="#fff" />
                            <Text style={styles.addFolderSubmitText}>HINZUFÜGEN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
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
        position: "absolute",
        right: 30,
        bottom: 30,
        height: 60,
        width: 60,
        borderRadius: 60,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: "bold",
        color: Colors.primary,
        fontSize: 20,
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        padding: 10,
        borderColor: Colors.secondary,
        borderRadius: 3,
        borderWidth: 1,
        marginBottom: 20,
    },
    inputText: {
        marginTop: 20,
        color: Colors.primary,
        fontSize: 18,
    },
    addFolderButton: {
        width: "auto",
        height: 30,
        borderRadius: 3,
        backgroundColor: Colors.yellow,
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    addFolderSubmitText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold"
    },
    closeModal: {
        width: "100%",
    }
});

export default FolderContentScreen;