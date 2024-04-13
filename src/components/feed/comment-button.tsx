import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'tamagui'
import { MessageCircle } from '@tamagui/lucide-icons'

const CommentButton = () => {
  return (
    <Button style={styles.button} iconAfter={MessageCircle}>
      Comment
    </Button>
  )
}

export default CommentButton

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'teal',
    color: 'white',
  }
})