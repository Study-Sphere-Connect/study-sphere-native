import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MeetupButtons = () => {
  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MeetupButtons

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
      acceptButton: {
        backgroundColor: '#3CB371',
    },
      rejectButton: {
        backgroundColor: '#FF6347',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})