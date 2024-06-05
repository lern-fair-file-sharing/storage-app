import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FileList from "../components/FileList";
import FileViewButton from "../components/FileViewButton";
import FileCard, { FileCardType } from "../components/FileCard";
import { FolderCardType } from "../components/FolderCard";
import FolderContentScreen, { RootStackParamList }  from "../components/FolderContentScreen";
import Colors from "../utils/Colors";


enum FileView {
    Activity,
    Courses,
}


interface TimeGroupedFiles {
    [lastModified: string]: FileCardType[];
}


const dummyFileData: { folders: FolderCardType[], files: FileCardType[] } = {
    folders: [
        {
            folderName: "Mathe mit Frau A.",
            folderURL: "www.google.com/Mathe mit Frau A.pdf"
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
        },
        {
            fileName: "übung1.pdf",
            fileType: "pdf",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            lastModified: "l3h"
        },
        {
            fileName: "abc.png",
            fileType: "png",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            lastModified: "today"
        },
        {
            fileName: "übung3.pdf",
            fileType: "pdf",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["biologie", "max"],
            lastModified: "today"
        },
        {
            fileName: "test-blatt.pdf",
            fileType: "pdf",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            lastModified: "week"
        },
        {
            fileName: "übung5.png",
            fileType: "png",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["physik", "moritz"],
            lastModified: "week"
        },
        {
            fileName: "übung1.pdf",
            fileType: "pdf",
            fileURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            lastModified: "week"
        }
    ]
}

const FilesTabScreen = () => {
    const [fileView, setFileView] = useState<FileView>(FileView.Activity);
    const [timeGroupedFiles, setTimeGroupedFiles] = useState<TimeGroupedFiles>();

    const toggleFileView = () => {
        setFileView(fileView === FileView.Courses ? FileView.Activity : FileView.Courses);
    };

    useEffect(() => {
        // TODO create a real function for grouping real file data based on their upload times
        let fileDatra = dummyFileData.files;
        const groupedFiles: TimeGroupedFiles = fileDatra.reduce<TimeGroupedFiles>((acc, file) => {
            const { lastModified } = file;
            if (!acc[lastModified]) {
                acc[lastModified] = [];
            }
            acc[lastModified].push(file);
            return acc;
        }, {});
        setTimeGroupedFiles(groupedFiles);
    }, []);

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
                        {timeGroupedFiles?.l3h && renderFileListSection("Letzte 3 Stunden", timeGroupedFiles.l3h)}
                        {timeGroupedFiles?.today && renderFileListSection("Heute", timeGroupedFiles.today)}
                        {timeGroupedFiles?.week && renderFileListSection("Diese Woche", timeGroupedFiles.week)}
                    </ScrollView>
                ) : (
                    <ScrollView style={styles.courseFolderSection}>
                        <FileList folders={dummyFileData.folders} files={[]}/>
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
