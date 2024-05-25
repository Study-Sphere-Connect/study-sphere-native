import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'; // Import Feather icon from Expo
import meetupRequests from '@/assets/data/meetup-requests';
import MeetupCard from '@/src/components/meetup/meetup-card';
import MeetupFilter from '@/src/components/meetup/meetup-filter';
import { Link } from 'expo-router';

const Meetups = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  // Filter meetupRequests based on selectedStatus
  const filteredMeetupRequests = selectedStatus === 'All' ? meetupRequests : meetupRequests.filter(request => request.status === selectedStatus);

  return (
    <View style={styles.container}>
      <Link href="meetup-room">Meetup Room</Link>
      <MeetupFilter onStatusChange={handleStatusChange} />
      {filteredMeetupRequests.length > 0 ? (
        <FlatList
          data={filteredMeetupRequests}
          renderItem={({ item }) => <MeetupCard meetup={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather name="alert-circle" size={50} color="gray" />
          <Text style={styles.emptyText}>No available meetup requests for the following status: {selectedStatus}</Text>
        </View>
      )}
    </View>
  );
};

export default Meetups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});
