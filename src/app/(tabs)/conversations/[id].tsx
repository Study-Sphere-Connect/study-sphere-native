import { conversations } from '@/assets/data/conversations';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ConversationDetail = () => {
  const { id } = useLocalSearchParams();
  const conversation = conversations.find((conv) => conv.id.toString() === id);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageItem: Message = {
      id: conversation?.messages.length || 0,
      text: newMessage,
      sender: 'Me',
    };
    conversation?.messages.push(newMessageItem);
    setNewMessage('');
};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: conversation?.name }} />
      <FlatList
        data={conversation?.messages || []}
        renderItem={({ item }) => (
          <View style={item.sender === 'Me' ? styles.myMessageContainer : styles.otherMessageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: 'teal',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConversationDetail;