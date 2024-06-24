import React from 'react';
import { View, ScrollView } from 'react-native';
import CourseCard from '../components/classCard';

const ClassesPage =  () => {
    const classes = [
        {
            title: 'Mathematik',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            title: 'Physik',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            title: 'Chemie',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            imageUrl: 'https://picsum.photos/200',
        },
        {
            title: 'Biologie',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            imageUrl: 'https://picsum.photos/200',
        },
    ];

return (
    <ScrollView>
        <View>
            {classes.map((course, index) => (
                <CourseCard
                    key={index}
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                    onPress={() => {}}
                />
            ))}
        </View>
    </ScrollView>
);
};

export default ClassesPage;