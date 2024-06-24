import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../utils/Colors';

interface ClassCardProps {
  time: string;
  title: string;
  members: string;
  year: string;
  status: string;
  imageUrl: string;
  onPress: () => void;
}

const ClassCard = ({ time, title, members, year, status, imageUrl, onPress }: ClassCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.dot} />
          <Text style={styles.members}>{members}</Text>
        </View>
        <Text style={styles.year}>
          <Text style={{ fontWeight: 'bold' }}>Jahrgangsstufe:</Text> {year}
        </Text>
        <Text style={styles.status}>
          <Text style={{ fontWeight: 'bold' }}>Status:</Text>{status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginVertical: 15,
    marginHorizontal: 30,
    overflow: 'hidden',
  },
  image: {
    width: 140,
    height: 140,
  },
  info: {
    flex: 1,
    paddingLeft: 30,
    paddingVertical: 20,
  },
  time: {
    fontSize: 12,
    color: Colors.primary,
    lineHeight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    lineHeight: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginRight: 5,
    alignSelf: 'center',
  },
  members: {
    fontSize: 12,
    color: Colors.primary,
    lineHeight: 20,
  },
  year: {
    fontSize: 12,
    color: Colors.primary,
    lineHeight: 20,
  },
  status: {
    fontSize: 12,
    color: Colors.primary,
    lineHeight: 20,
  },
});

export default ClassCard;
