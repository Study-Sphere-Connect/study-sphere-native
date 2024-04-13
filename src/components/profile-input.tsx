import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ProfileInputProps {
    label: string,
    text: string
}

const ProfileInput = ({ label, text }: ProfileInputProps) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}:</Text>
        <Text style={styles.inputText}>{text}</Text>
    </View>
  )
}

export default ProfileInput

const styles = StyleSheet.create({
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
})