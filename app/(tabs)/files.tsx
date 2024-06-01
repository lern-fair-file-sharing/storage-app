import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FileList from "../components/FileList";
import FileViewButton from "../components/FileViewButton";
import { FileData } from "../components/FileCard";


enum FileView {
    Activity,
    Courses,
}


interface TimeGroupedFiles {
    [uploadTime: string]: FileData[];
}


const FilesPage = () => {
    const [fileView, setFileView] = useState<FileView>(FileView.Activity);
    const [timeGroupedFiles, setTimeGroupedFiles] = useState<TimeGroupedFiles>();

    const toggleFileView = () => {
        setFileView(fileView === FileView.Courses ? FileView.Activity : FileView.Courses);
    };

    useEffect(() => {
        // TODO create a real function for grouping real file data based on their upload times
        const groupedFiles: TimeGroupedFiles = dummyFileData.reduce<TimeGroupedFiles>((acc, file) => {
            const { uploadTime } = file;
            if (!acc[uploadTime]) {
                acc[uploadTime] = [];
            }
            acc[uploadTime].push(file);
            return acc;
        }, {});
        setTimeGroupedFiles(groupedFiles);
    }, []);


    const dummyFileData: FileData[] = [
        {
            fileName: "geometrie-hausaufgabe.png",
            fileType: "png",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            uploadTime: "l3h"
        },
        {
            fileName: "übung1.pdf",
            fileType: "pdf",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            uploadTime: "l3h"
        },
        {
            fileName: "abc.png",
            fileType: "png",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            uploadTime: "today"
        },
        {
            fileName: "übung3.pdf",
            fileType: "pdf",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["biologie", "max"],
            uploadTime: "today"
        },
        {
            fileName: "test-blatt.pdf",
            fileType: "pdf",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            uploadTime: "week"
        },
        {
            fileName: "übung5.png",
            fileType: "png",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["physik", "moritz"],
            uploadTime: "week"
        },
        {
            fileName: "übung1.pdf",
            fileType: "pdf",
            fileDownloadURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            filePreviewURL: "https://i.pinimg.com/736x/d8/27/a3/d827a3a7acd4f727f8f4f2c45e2cb309.jpg",
            tags: ["mathe", "joe"],
            uploadTime: "week"
        }
    ]

    const renderFileListSection = (title: string, files: FileData[]) => (
        <>
            <Text style={styles.fileActivityTime}>{title}:</Text>
            <View style={styles.fileActivitySection}>
                <FileList data={files} />
            </View>
        </>
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
                        borderBottomColor: "#2B4B51",
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
                    <View style={styles.courseFolderSection}></View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        backgroundColor: "#f2f2f2",
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
        marginVertical: 10
    },
    fileActivityTime: {
        color: "#2B4B51"
    },
    courseFolderSection: {
        height: 500,
        backgroundColor: "gray",
    },
});


export default FilesPage;
