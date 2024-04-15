import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Chat from '@/src/components/conversations/conversation-item'
import ConversationItem from '@/src/components/conversations/conversation-item';
import { conversations } from '@/assets/data/conversations';

const Conversations = () => {
  return (
    <FlatList style={styles.container} data={conversations} renderItem={({ item }) => <ConversationItem {...item} />} keyExtractor={item => item.id.toString()} />
  )
}

export default Conversations

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  }
})