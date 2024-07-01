import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text, View, Platform, ToastAndroid, Alert, TextInput, Modal } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { getFolderContent, uploadFile, createFolder } from "../utils/ServerRequests";
import { FolderCardType, FileCardType } from "../types/FileTypes";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { PERSONAL_SPACE_FOLDER_NAME, pickFileFromDevice } from "../utils/utils";
import Ionicons from '@expo/vector-icons/Ionicons';


export type RootStackParamList = {
    ClassListScreen: undefined,
    ClassScreen: { title: string };
};


const ClassScreen = (props: NativeStackScreenProps<RootStackParamList, "ClassScreen">) => {
    const navigation = useNavigation();
    //const [inputHeight, setInputHeight] = useState(50);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: decodeURI(props.route.params?.title),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <ScrollView style={styles.chatContent}>

                </ScrollView>
                <View style={styles.sendMessageContainer}>
                    <View style={styles.chatInputContainer}>
                        <TextInput
                            style={styles.chatInputField}
                            placeholder="Nachricht schreiben..."
                            multiline={true}
                            placeholderTextColor={Colors.secondary}
                        />
                        <View style={styles.attachButtons}>
                            <TouchableOpacity style={styles.attachButton}>
                                <Ionicons name="attach" size={30} color={Colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.attachButton}>
                                <Ionicons name="camera" size={25} color={Colors.secondary} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    
                    <TouchableOpacity style={styles.sendButton}>
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        gap: 7,
        padding: 24,
    },
    chatContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        gap: 24,
    },
    chatContent: {
        backgroundColor: Colors.surface,
        opacity: 0.5,
        borderRadius: 8,
    },
    sendMessageContainer: {
        display: "flex",
        maxHeight: 125,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        gap: 10,
    },
    chatInputContainer: {
        flex: 1,
        height: "100%",
        borderRadius: 8,
        backgroundColor: Colors.lightGray,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 10
    },
    chatInputField: {
        flex: 1,
        textAlignVertical: "center",
        height: "100%",
        color: "black",
        paddingVertical: 10,
        paddingLeft: 15,
        fontSize: 15,
    },
    attachButtons: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    attachButton: {
        width: 30,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sendButton: {
        height: 50,
        width: 50,
        borderRadius: 8,
        backgroundColor: Colors.yellow,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        float: "bottom"
    }
})

export default ClassScreen;