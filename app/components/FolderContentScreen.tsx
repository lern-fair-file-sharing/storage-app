import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { getFolderContent } from "../utils/ServerRequests";
import { FileListType, FolderCardType, FileCardType } from "../types/FileTypes";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export type RootStackParamList = {
    FilesTabScreen: undefined,
    FolderContentScreen: { folderURL: string, folderName: string };
};


const FolderContentScreen = (props: NativeStackScreenProps<RootStackParamList, "FolderContentScreen">) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: props.route.params?.folderName,
        });
    }, [navigation]);

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

    const [allFolders, setAllFolders] = useState<FolderCardType[]>([] as FolderCardType[]);
    const [allFiles, setAllFiles] = useState<FileCardType[]>([] as FileCardType[]);

    useEffect(() => {
        fetchFolderContent();
    }, []);
    

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
            >
            <FileList folders={allFolders} files={allFiles}/>
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

    safeArea: {
        flex: 1,
    },
});

export default FolderContentScreen;