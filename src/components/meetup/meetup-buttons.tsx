import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MeetupButtons = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.acceptButton]}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rejectButton]}>
        <Text style={styles.rejectButtonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MeetupButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: "#000",
    color: "#000",
  },
  rejectButton: {
    borderColor: "#000",
    borderWidth: 2,
    
  },
  acceptButtonText : {
    color: "#fff",
    fontWeight: "bold",

  },
  rejectButtonText : {
    color: "#000",
    fontWeight: "bold",
  }
});
