import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'tamagui'
import { MessageCircle } from '@tamagui/lucide-icons'

const CommentButton = () => {
  const handleComment = () => {

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleComment}>
        <MessageCircle size={24} />
      </TouchableOpacity>
      <Text>6.1K</Text>
    </View>
  )
}

export default CommentButton

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
})