import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MeetupButtons from './meetup-buttons';

interface Meetup {
    id: number;
    menteeId: string;
    mentorId: string;
    message: string;
    date: string;
    time: string;
    status: string;
}

interface MeetupCardProps {
    meetup: Meetup;
}

const MeetupCard = ({ meetup }: MeetupCardProps) => {
  return (
    <View style={styles.card}>
      <Text>Mentee ID: {meetup.menteeId}</Text>
      <Text>Mentor ID: {meetup.mentorId}</Text>
      <Text>Message: {meetup.message}</Text>
      <Text>Date: {meetup.date}</Text>
      <Text>Time: {meetup.time}</Text>
      <Text>Status: {meetup.status}</Text>
      <MeetupButtons />
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
      },
});

export default MeetupCard;