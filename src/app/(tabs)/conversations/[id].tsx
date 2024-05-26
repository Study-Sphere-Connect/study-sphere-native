import { conversations } from "@/assets/data/conversations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
}

const ConversationDetail = () => {
  const { id } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getMessages(id as string);
  }, [id]);


  useEffect(() => {
    console.log(id);
  }, [id]);

  useEffect(() => {
    console.log("Message Data is coming");
    console.log(messages);
  }, [messages]);

  let flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const getMessages = async (id: string) => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");

      const res = await axios.get(`${process.env.API_URL}/message/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });

      if (res.status === 200) {
        setMessages(res.data);
      }

    } 
    catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (content:string) => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      
      const newMessage = {
        id: generateUniqueId(), // Function to generate a unique ID
        content: content,
        senderId: "clsw0qelu0000i6nx9s8cygje",
        conversationId:messages[0].conversationId
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
  
      // Send the message to the server
      const res = await axios.post(`${process.env.API_URL}/message/create`, newMessage, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      if (res.status === 200) {
        // Update state with the new message
        Alert.alert('Success', 'You have send message successfully!');
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage(""); // Clear the input field after sending the message
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Simple unique ID generator
  };

  return (
    <View style={styles.container}>
      {messages.length > 0 ? (
        <>
          <Stack.Screen options={{ title: "under development" }} />
          <FlatList
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            ref={flatListRef}
            data={messages || []}
            renderItem={({ item }) => (
              <View
                style={
                  item.senderId === "clsw0qelu0000i6nx9s8cygje"
                    ? styles.myMessageContainer
                    : styles.otherMessageContainer
                }
              >
                <Text style={styles.messageText}>{item.content}</Text>
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
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
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
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    maxWidth: "70%",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "teal",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ConversationDetail;
