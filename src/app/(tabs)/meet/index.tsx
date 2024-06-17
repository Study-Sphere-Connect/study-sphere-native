import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import getCurrentUser from "@/src/hooks/getCurrentUser";
import { CurrentUser } from "@/src/types";
const Meet = () => {
  const [roomCode, setRoomCode] = useState("");
  const [user, setUser] = useState<CurrentUser | null>(null);

  const joinRoom = () => {
    console.log(roomCode);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  

  return (    
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.inputLabel}>Enter Your Room Code</Text>
        <TextInput
          style={styles.input}
          placeholder="ABCD-EFGH"
          onChangeText={(val) => setRoomCode(val)}
        ></TextInput>
        <TouchableOpacity style={styles.submitButton} onPress={joinRoom}>
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
