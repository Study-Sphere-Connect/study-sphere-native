import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'tamagui'
import { ThumbsUp } from '@tamagui/lucide-icons'

const KudoButton = () => {
  return (
    <Button style={styles.button} iconAfter={ThumbsUp}>
      Kudo
    </Button>
  )
}

export default KudoButton

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'teal',
    color: 'white',
  }
})