import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import ConfirmationCard from "../components/confirmationCard";
import AppointmentCard from "../components/appointmentCard";
import Colors from "../utils/Colors";

const name = "Stephan";

const ConfirmationData = [
    {
        id: "1",
        subject: "Nachhilfe mit ",
        name: "Leon",
        headline: "Bestätigung",
        body: "Es wurde um eine Bescheinigung für eure Lernunterstützung gebeten. Nur wenn du dies bestätigst, können wir diesen Wunsch erfüllen.",
        linkText: "Angaben bestätigen"
    },
    {
        id: "2",
        subject: "Lernfortschritt mit ",
        name: "Anna",
        headline: "Erfolg bestätigen",
        body: "Anna hat große Fortschritte gemacht. Bitte bestätige ihre Leistung, damit wir ihr eine entsprechende Bescheinigung ausstellen können.",
        linkText: "Leistung bestätigen"
    },
    {
        id: "3",
        subject: "Feedback für ",
        name: "Max",
        headline: "Rückmeldung",
        body: "Max hat um eine Rückmeldung zu seinen letzten Lernstunden gebeten. Bitte bestätige, dass du seine Leistung bewerten möchtest.",
        linkText: "Feedback geben"
    }
];

const AppointmentData = [
    {
        id: "1",
        days: 4,
        classTitle: "Grundlagen der Mathematik",
    },
    {
        id: "2",
        days: 8,
        classTitle: "Einführung in die Informatik",
    },
    {
        id: "3",
        days: 12,
        classTitle: "Englisch für Anfänger",
    }
];

const StartPage = () => {
    return (
        <View style={styles.pageContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.greeting}>
                    <Text style={styles.greetingText}>Hallo {name}!</Text>
                </View>
                <View style={styles.nextSteps}>
                    <Text style={styles.nextStepsHeadline}>Deine nächsten Schritte</Text>
                    <Text style={styles.nextStepsSub}>Alle Fortschritte anzeigen</Text>
                </View>
                <FlatList
                    data={ConfirmationData}
                    renderItem={({ item }) => (
                        <ConfirmationCard
                            subject={item.subject}
                            name={item.name}
                            headline={item.headline}
                            body={item.body}
                            linkText={item.linkText}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                    contentContainerStyle={styles.flatListContentConfirmation}
                />
                <View style={styles.nextAppointment}>
                    <Text style={styles.nextAppointmentText}>Nächster Termin</Text>
                    <FlatList
                    data={AppointmentData}
                    renderItem={({ item }) => (
                        <AppointmentCard
                            days={item.days}
                            classTitle={item.classTitle}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
                    contentContainerStyle={styles.flatListContentAppointments}
                />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: Colors.background,
    },
    greeting: {
        backgroundColor: Colors.primary,
        padding: 25,
        marginBottom: 10,
    },
    greetingText: {
        fontWeight: "700",
        fontSize: 20,
        color: Colors.onPrimary,
    },
    nextSteps: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    nextStepsHeadline: {
        fontWeight: "700",
        fontSize: 20,
        color: Colors.primary,
    },
    nextStepsSub: {
        color: Colors.primary,
        textDecorationLine: "underline",
    },
    flatListContentConfirmation: {
        paddingHorizontal: 16,
    },
    flatListContentAppointments: {
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    cardSeparator: {
        width: 16,
        height: 16,
    },
    nextAppointment: {
        marginTop: 16,
    },
    nextAppointmentText: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.primary,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
});

export default StartPage;