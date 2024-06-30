import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { HMSLocalPeer, HMSSDK } from "@100mslive/react-native-hms";
import { useHMS } from "@/src/lib/hmsProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const ControlBar = () => {
    const router = useRouter();
    const hmsInstance = useHMS();

    const handleLeave = async () => {
      await hmsInstance?.leave();
      router.navigate("/join-room");
    };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.redButton} onPress={handleLeave}>
        <Feather name="phone-off" size={24} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.greyButton}>
        <Feather name="mic-off" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.greyButton}>
        <Feather name="video-off" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.greyButton}>
      <Feather name="message-square" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  redButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 100,
  },
  greyButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 100,
  },
});

export default ControlBar;
