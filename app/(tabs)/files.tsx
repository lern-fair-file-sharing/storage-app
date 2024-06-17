import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FileList from "../components/FileList";
import FileViewButton from "../components/FileViewButton";
import FileCard from "../components/FileCard";
import { FileCardType, FileListType, FolderCardType } from "../types/FileTypes";
import FolderContentScreen, { RootStackParamList }  from "../components/FolderContentScreen";
import Colors from "../utils/Colors";
import { getFolderContent, searchLatestFiles} from "../utils/ServerRequests";


enum FileView {
    Activity,
    Courses,
}


interface TimeGroupedFiles {
    [lastModified: string]: FileCardType[];
}


const FilesTabScreen = () => {
    const [fileView, setFileView] = useState<FileView>(FileView.Activity);
    const [timeGroupedFiles, setTimeGroupedFiles] = useState<TimeGroupedFiles>();
    const [allFolders, setAllFolders] = useState<FolderCardType[]>( [] as FolderCardType[]);
    const [allFiles, setAllFiles] = useState<FileCardType[]>( [] as FileCardType[]);
    const [latestFiles, setLatestFiles] = useState<FileCardType[]>( [] as FileCardType[]);


    useEffect(() => {
        const fetchFolderContent = async () => {
            const content = await getFolderContent("/remote.php/dav/files/testuser/");
            if (content) {
                setAllFiles(content.files);
                setAllFolders(content.folders);
            }
        };
        const fetchLatestFiles = async () => {
            const results = await searchLatestFiles();
            if (results) {
                setLatestFiles(results);
            }
        };
        fetchFolderContent();
        fetchLatestFiles();
    }, []);


    const toggleFileView = () => {
        setFileView(fileView === FileView.Courses ? FileView.Activity : FileView.Courses);
    };

    const renderFileListSection = (title: string, files: FileCardType[]) => (
        <View style={styles.fileActivitySection}>
            <Text style={styles.fileActivityTime}>{title}:</Text>
            {
                files.map((file: FileCardType, idx: number) => {
                    return <FileCard key={idx} {...file} />
                })
            }
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.fileViews}>
                    <FileViewButton
                        active={fileView === FileView.Activity}
                        text="Aktivität"
                        callback={toggleFileView}
                        icon={Ionicons}
                        iconName="notifications"
                    />
                    <FileViewButton
                        active={fileView === FileView.Courses}
                        text="Kurse"
                        callback={toggleFileView}
                        icon={FontAwesome}
                        iconName="group"
                    />
                </View>

                <View style={styles.searchSection}>
                    {/* TODO create and add search component */}
                </View>

                <View
                    style={{
                        borderBottomColor: Colors.primary,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

                {fileView === FileView.Activity ? (
                    <ScrollView style={styles.timeBasedFileActivities}>
                        {renderFileListSection("Letzte 3 Stunden", latestFiles.slice(0, 3))}
                        {renderFileListSection("Heute", latestFiles.slice(3, 6))}
                        {renderFileListSection("Diese Woche", latestFiles.slice(6, 9))}
                    </ScrollView>
                ) : (
                    <ScrollView style={styles.courseFolderSection}>
                        <FileList folders={allFolders} files={allFiles}/>
                    </ScrollView>
                )}
            </View>
        </View>
    );
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const FilesPage = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FilesTabScreen"
                component={FilesTabScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FolderContentScreen"
                component={FolderContentScreen}
            />
        </Stack.Navigator>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
    },
    fileViews: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 20,
    },
    searchSection: {
        height: 50,
        backgroundColor: "#cfcfcf",
    },
    timeBasedFileActivities: {
        
    },
    fileActivitySection: {
        marginBottom: 10,
        gap: 7
    },
    fileActivityTime: {
        color: Colors.primary
    },
    courseFolderSection: {
    },
});


export default FilesPage;
