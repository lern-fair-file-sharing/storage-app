import { Key, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import FileList from "./FileList";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FolderCardType } from "./FolderCard";
import { FileCardType } from "./FileCard";
import { useNavigation } from "expo-router";
import { useRoute } from '@react-navigation/native';
import React from "react";



export type RootStackParamList = {
    FilesHome: undefined,
    Folder: { folderURL: string, folderName: string };
};


const Folder = (props: NativeStackScreenProps<RootStackParamList, "Folder">) => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: props.route.params?.folderName,
        });
    }, [navigation]);

    const dummyData = {
        folders: [
            {
                folderName: "Mathe mit Frau A.",
                folderURL: "www.google.com"
            },
            {
                folderName: "Biologie mit Fr B.",
                folderURL: "www.google.com"
            }
        ],
        files: [
            {
                fileName: "geometrie-hausaufgabe.png",
                fileType: "png",
                fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
                filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
                tags: ["mathe", "joe"],
                lastModified: "l3h"
            }
        ]
    }

    return (
        <ScrollView style={styles.container}>
            <FileList folders={dummyData.folders} files={dummyData.files}/>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        gap: 7,
        padding: 20,
    },
});

export default Folder;