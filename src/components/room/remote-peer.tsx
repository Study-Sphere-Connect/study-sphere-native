import { useHMS } from "@/src/lib/hmsProvider";
import { View, Text, StyleSheet } from "react-native";
import { HMSRemotePeer, HMSVideoViewMode } from "@100mslive/react-native-hms";

interface RemotePeerProps{
    remotePeer:HMSRemotePeer;
}

const RemotePeer = ({remotePeer}:RemotePeerProps )=> {
    const hmsInstance = useHMS();
    const HmsView = hmsInstance?.HmsView
    return(
        <>
        {
            HmsView && remotePeer &&
            remotePeer.videoTrack && !remotePeer.videoTrack.mute ? (
              <>
                <HmsView
                  style={{ height: "100%", width: "100%" }}
                  trackId={remotePeer.videoTrack.trackId}
                  key={remotePeer.videoTrack.trackId}
                  scaleType={HMSVideoViewMode.ASPECT_FIT}
                  mirror={true}
                ></HmsView>
                <Text style={styles.otherPeerName}>{remotePeer.name}</Text>
              </>
            ) : (
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Text style={{color:"white", fontSize:40}}>Video is mute</Text>
              </View>
        )}
        </>
    )
}

export default RemotePeer;

const styles = StyleSheet.create({
    
    otherPeerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    otherPeerName: {
      position: "absolute",
      color: "white",
      backgroundColor: "grey",
      padding: 10,
      borderRadius: 20,
      fontSize: 15,
      top: 30,
      left: 30,
    }
  });
  