import { View, Text, StyleSheet, ScrollView } from "react-native";
import ConfirmationCard from "../components/confirmationCard";
import AppointmentCard from "../components/appointmentCard";

const StartPage = () => {
    return (
        <ScrollView>
            <View style={styles.greeting}>
                <Text style={styles.greetingText}>Hallo Stephan!</Text>
            </View>
            <View style={{height: 40}}/>
            <View style={styles.nextSteps}>
                <Text style={styles.nextStepsHeadline}>Deine nächsten Schritte</Text>
                <Text style={styles.nextStepsSub}>Alle Fortschritte anzeigen</Text>
            </View>
            <ScrollView style={styles.confirmationCardScrollView} horizontal showsHorizontalScrollIndicator={false}>
                <ConfirmationCard/>
                <View style={{width: 16}}/>
                <ConfirmationCard/>
            </ScrollView>
            <View style={{height: 20}}/>
            <View style={styles.nextAppointment}>
                <Text style={styles.nextAppointmentText}>Nächster Termin</Text>
            </View>
            <AppointmentCard/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    greeting: {
        backgroundColor: "#2B4B51",
        padding: 25,
        borderWidth: 0
    },
    greetingText: {
        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },
    nextSteps: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    nextStepsHeadline: {
        fontWeight: "700",
        fontSize: 20,
        color: "#2B4B51"
    },
    nextStepsSub: {
        color: "#2B4B51",
        textDecorationLine: "underline"
    },
    confirmationCardScrollView: {
        flexDirection: "row",
        display: "flex",
        flexWrap: "nowrap",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        width: "auto"
    },
    nextAppointment: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    nextAppointmentText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2B4B51"
    }
})

export default StartPage;