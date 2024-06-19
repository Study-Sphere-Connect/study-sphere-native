import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import { useState, useEffect } from "react";
import getCurrentUser from "@/src/hooks/getCurrentUser";
import { CurrentUser } from "@/src/types";
import { Link, useRouter } from 'expo-router';
import getHMSInstance from "@/src/lib/hms";

const Meet = () => {
  const [roomCode, setRoomCode] = useState("mey-kkdk-qvv");
  
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const hmsInstance = await getHMSInstance();
      const authToken = await hmsInstance.getAuthTokenByRoomCode(roomCode);
      if(authToken)
      {
        router.navigate(`/room/${authToken}`);
      }
    } 
    catch (error) {
      console.error('Error getting auth token:', error);
    }
  }

  
  return (    
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.inputLabel}>Enter Your Room Code</Text>
        <TextInput
          style={styles.input}
          placeholder="xxx-xxxx-xxx"
          // onChangeText={(val) => setRoomCode(val)}
        ></TextInput>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: "white", textAlign: "center" }}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Meet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  inputLabel: {
    marginBottom: 10,
    fontSize: 15,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    display: "flex",
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
});
