import { View, Text, StyleSheet, Image } from 'react-native';

const ConfirmationCard = () => {
    return (
        <View style={styles.container}>
            <Image style={{ alignSelf: 'flex-start'}} source={require("../../assets/book.png")}/>
            <Text style={styles.text1}>Nachhilfe mit Leon</Text>
            <Text style={styles.confirmationText}>Bestätigung</Text>
            <Text style={styles.text3}>Leon hat uns um eine Bescheinigung für eure Lernunterstützung gebeten. Nur wenn du dies bestätigst, können</Text>
            <Text style={styles.text4}>Angaben bestätigen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#2B4B51",
        padding: 24,
        width: 288,
        borderRadius: 8,
        justifyContent: "flex-start",
    },
    text1: {
        color: "white",
        fontWeight: "500",
        fontSize: 13
    },
    confirmationText: {
        fontWeight: "700",
        color: "white",
        fontSize: 20,
        marginBottom: 20
    },
    text3: {
        fontWeight: "500",
        color: "white",
        marginBottom: 20,
        fontSize: 13
    },
    text4: {
        fontWeight: "500",
        color: "rgb(254, 218, 80)",
        fontSize: 13
    }
})

export default ConfirmationCard;