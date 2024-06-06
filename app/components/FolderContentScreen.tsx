import { StyleSheet, ScrollView } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React from "react";



export type RootStackParamList = {
    FilesTabScreen: undefined,
    FolderContentScreen: { folderURL: string, folderName: string };
};


const FolderContentScreen = (props: NativeStackScreenProps<RootStackParamList, "FolderContentScreen">) => {
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

export default FolderContentScreen;