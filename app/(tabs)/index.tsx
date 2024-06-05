import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import ConfirmationCard from "../components/confirmationCard";
import AppointmentCard from "../components/appointmentCard";
import Colors from "../utils/Colors";

const props = {
    name: "Stephan"
}

const Data = [
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

const StartPage = () => {
    return (
        <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.greeting}>
                <Text style={styles.greetingText}>Hallo {props.name}!</Text>
            </View>
            <View style={{height: 40}}/>
            <View style={styles.nextSteps}>
                <Text style={styles.nextStepsHeadline}>Deine nächsten Schritte</Text>
                <Text style={styles.nextStepsSub}>Alle Fortschritte anzeigen</Text>
            </View>
            <View style={styles.confirmationCardScrollView}>
                <FlatList
                    data={Data}
                    renderItem={({item}) => <ConfirmationCard subject={item.subject} name={item.name} headline={item.headline} body={item.body} linkText={item.linkText}/>}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{width: 16}}/>}
                />
            </View>
            <View style={{height: 20}}/>
            <View style={styles.nextAppointment}>
                <Text style={styles.nextAppointmentText}>Nächster Termin</Text>
            </View>
            <AppointmentCard/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: Colors.background
    },
    greeting: {
        backgroundColor: Colors.primary,
        padding: 25,
        borderWidth: 0
    },
    greetingText: {
        fontWeight: "700",
        fontSize: 20,
        color: Colors.onPrimary,
    },
    nextSteps: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    nextStepsHeadline: {
        fontWeight: "700",
        fontSize: 20,
        color: Colors.primary
    },
    nextStepsSub: {
        color: Colors.primary,
        textDecorationLine: "underline"
    },
    confirmationCardScrollView: {
        flexDirection: "row",
        display: "flex",
        flexWrap: "nowrap",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    cardContainer: {
        marginRight: 16
    },
    nextAppointment: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    nextAppointmentText: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.primary
    }
})

export default StartPage;