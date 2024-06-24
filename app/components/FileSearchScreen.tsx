import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import FileList from "./FileList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { searchFilesByKeyword } from "../utils/ServerRequests";
import { FileListType, FolderCardType, FileCardType } from "../types/FileTypes";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export type RootStackParamList = {
    FilesTabScreen: undefined,
    FolderContentScreen: { folderPath: string, folderName: string },
    FileSearchScreen: { searchParam: string };
};


const FileSearchScreen = (props: NativeStackScreenProps<RootStackParamList, "FileSearchScreen">) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: props.route.params?.searchParam,
        });
    }, [navigation]);

    const onRefresh = useCallback(() => {
       getFileSearchResults(); 
    }, []);

    const getFileSearchResults = async () => {
      if (String(props.route.params?.searchParam).length < 3) {
          return;
      }
      var results = await searchFilesByKeyword(props.route.params?.searchParam);

      if (results && results.length > 0 && results !== undefined) {
        setAllFiles(results);
      }
    };

    const [allFolders, setAllFolders] = useState<FolderCardType[]>([] as FolderCardType[]);
    const [allFiles, setAllFiles] = useState<FileCardType[]>([] as FileCardType[]);

    useEffect(() => {
        getFileSearchResults();
    }, []);
    

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
            >
            <FileList folders={allFolders} files={allFiles} refreshFunction={getFileSearchResults}/>
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

export default FileSearchScreen;