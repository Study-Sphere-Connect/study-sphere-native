import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Share2 } from '@tamagui/lucide-icons'

const ShareButton = () => {
  const handleShare = () => {

  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Share2 size={24} />
    </TouchableOpacity>
  )
}

export default ShareButton

const styles = StyleSheet.create({
})