import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Colors from '../utils/Colors';
import ClassCard from '../components/classCard';


const ClassesPage = () => {
    const classes = [
        {
            time: 'Dienstag, 13:00',
            title: 'Mathematik',
            members: '3 von 10 Plätzen belegt',
            year: '5. Klasse',
            status: 'Öffenlich',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            time: 'Mittwoch, 14:00',
            title: 'Physik',
            members: '3 von 10 Plätzen belegt',
            year: '6. Klasse',
            status: 'Privat',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            time: 'Donnerstag, 15:00',
            title: 'Chemie',
            members: '3 von 10 Plätzen belegt',
            year: '7. Klasse',
            status: 'Öffenlich',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            time: 'Freitag, 16:00',
            title: 'Biologie',
            members: '3 von 10 Plätzen belegt',
            year: '8. Klasse',
            status: 'Privat',
            imageUrl: 'https://picsum.photos/200',
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.list}>
                <View>
                    {classes.map((course, index) => (
                        <ClassCard
                            key={index}
                            time={course.time}
                            title={course.title}
                            members={course.members}
                            year={course.year}
                            status={course.status}
                            imageUrl={course.imageUrl}
                            onPress={() => { }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: Colors.background,
    },
    list: {
        flex: 1,
        margin: 24,
    }
});

export default ClassesPage;