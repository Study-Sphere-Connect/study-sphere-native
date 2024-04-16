import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import meetupRequests from '@/assets/data/meetup-requests'
import MeetupCard from '@/src/components/meetup/meetup-card'
import MeetupFilter from '@/src/components/meetup/meetup-filter'

const Meetups = () => {
  return (
    <View>
      {/* <SelectDemo /> */}
      <MeetupFilter />
      <FlatList 
        data={meetupRequests}
        renderItem={({ item }) => <MeetupCard meetup={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  )
}

export default Meetups

const styles = StyleSheet.create({})