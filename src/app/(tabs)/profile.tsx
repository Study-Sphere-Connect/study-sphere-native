import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const personalInfoInput = [
  {
    label: 'Name',
    value: 'Haider Ali',
  },
  {
    label: 'Email',
    value:  'haider.ali@gmail.com'
  },
];

const educationalInfoInput = [
  {
    label: 'Institution Name',
    value: 'Stanford University',
  },
  {
    label: 'Country',
    value: 'USA',
  },
  {
    label: 'Education Level',
    value: 'Master\'s',
  },
  {
    label: 'Major',
    value: 'Computer Science',
  },
  {
    label: 'Is Education Verified',
    value: 'Yes',
  },
  {
    label: 'Start Year',
    value: '2018',
  },
  {
    label: 'End Year',
    value: '2020',
  },
];

const Profile = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp0Ei0SHzCvu20wP3C1NOmoKZcsFsQW8dKg&s' }} width={100} height={100} borderRadius={100} />
        <Text style={styles.name}>Haider Ali</Text>
        <Text style={styles.institution}>Stanford University</Text>
        <Pressable style={styles.button}>
          <Text style={{ color: 'white' }}>Submit Verification Request</Text>
        </Pressable>
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {personalInfoInput.map((input, index) => (
            <View style={styles.inputContainer} key={index}>
              <Text style={styles.inputLabel}>{input.label}:</Text>
              <Text style={styles.inputText}>{input.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educational Information</Text>
          {educationalInfoInput.map((input, index) => (
            <View style={styles.inputContainer} key={index}>
              <Text style={styles.inputLabel}>{input.label}:</Text>
              <Text style={styles.inputText}>{input.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  institution: {
    fontSize: 16,
    color: 'gray'
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  main: {
    marginTop: 20,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    flex: 1,
    marginRight: 10,
  },
  inputText: {
    flex: 3,
  },
});
