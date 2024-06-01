import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";


const FolderCard = () => {

    return (
        <View style={styles.container}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDF4F3",
        alignItems: "center",
        minHeight: 40,
        width: "100%",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#82B1B0",
        display: "flex",
        flexDirection: "row",
        padding: 5,
        gap: 20,
    },
    filePreview: {
        flex: 1,
        height: "75%",
        borderRadius: 3,
    },
    fileInfos: {
        flex: 6,
        display: "flex",
        gap: 5,
    },
    tagPlaceHolder: {
        backgroundColor: "#cfcfcf",
        height: 20,
    },
    fileName: {
        fontSize: 15,
        color: "#2B4B51",
    },
});

export default FolderCard;
