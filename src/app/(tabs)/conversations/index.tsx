import { FlatList, StyleSheet, ActivityIndicator, Text, View, Alert } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Chat from "@/src/components/conversations/conversation-item";
import ConversationItem from "@/src/components/conversations/conversation-item";
import { conversations } from "@/assets/data/conversations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Conversations = () => {
  const [conversation, setConversation] = useState();
  const getConversations = async () => {
    try {
      const jwt = await AsyncStorage.getItem("jwt");
      
      const res = await axios.get(`${process.env.API_URL}/conversation/get`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      
      if (res.status === 200) {
        setConversation(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <>
    {conversation ?  
      <FlatList
      style={styles.container}
      data={conversation}
      renderItem={({ item }) => <ConversationItem {...item} />}
      keyExtractor={(item) => item.id.toString()}
      />
      :
    <View style={{height: '100%'}}>

      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
    </View>
    }
    </>
  );
};

export default Conversations;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  loaderContainer: {
    display:"flex",
    flex:1,
    flexDirection:"column",
    justifyContent: "center",
    alignItems:"center",
  }

});
