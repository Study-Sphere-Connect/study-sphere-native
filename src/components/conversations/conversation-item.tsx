import { Image, StyleSheet, Text, TouchableOpacity, View, ViewBase } from 'react-native'
import React from 'react';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ConversationProps {
  id: number
  name: string
  // time: string
  lastMessage: string
  profilePhoto: string
}

const ConversationItem = ({ ...conversation }: ConversationProps) => {
  return (
    <Link href={{
      pathname: "/conversations/details",
      params : { id:conversation.id, name:conversation.name },
      }} 
    asChild>
      <TouchableOpacity style={styles.container}>
        {conversation.profilePhoto ? 
          <Image source={{ uri: conversation.profilePhoto }} style={styles.profilePhoto} />
        :
        <View>
          <FontAwesome size={38} style={{marginHorizontal:6}} name="user-circle-o" color={"teal"} />
        </View>
        }
        <View style={styles.content}>
          <View style={styles.nameTime}>
            <Text style={styles.name}>{conversation.name}</Text>
            {/* <Text style={styles.time}>{conversation.time}</Text> */}
          </View>
          <Text style={styles.message}>
            {conversation.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default ConversationItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 5,
    marginLeft: 10,
  },
  nameTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  time: {
    color: 'grey',
    fontSize: 12
  },
  message: {
    color: 'grey'
  }
})