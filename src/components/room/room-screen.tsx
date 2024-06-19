import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useHMS } from "@/src/lib/hmsProvider";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  HMSLocalPeer,
  HMSPeer,
  HMSPeerUpdate,
  HMSRemotePeer,
  HMSUpdateListenerActions,
  HMSVideoViewMode,
} from "@100mslive/react-native-hms";

const RoomScreen = () => {
  const router = useRouter();
  const hmsInstance = useHMS();

  const [localPeer, setLocalPeer] = useState<HMSLocalPeer | null>(null);
  const [remotePeer, setRemotePeer] = useState<HMSRemotePeer | null>(null);

  useEffect(() => {
    const fetchPeers = async () => {
      if (hmsInstance) {
        // Use the hms instance
        console.log("HMS CONTEXT WORKING");
        console.log(hmsInstance);
        const remotePeer = await hmsInstance?.getRemotePeers();
        setRemotePeer(remotePeer[0]);
        const localPeer = await hmsInstance?.getLocalPeer();
        setLocalPeer(localPeer);
      }
    };

    fetchPeers();
  }, [hmsInstance]);

  useEffect(() => {
    console.log("Local Peer", localPeer);
  }, [localPeer]);
  useEffect(() => {
    console.log("Remote Peer", remotePeer);
  }, [remotePeer]);
  
  const onPeerListener = async ({ peer, type }: { peer: HMSPeer, type: HMSPeerUpdate }) => {
      if (type === HMSPeerUpdate.PEER_JOINED) {
        console.log(peer,type);  
        const remotePeer = await hmsInstance?.getRemotePeers();
        if(remotePeer)
        {
            setRemotePeer(remotePeer[0]);
        }
        console.log("ON LISTENER PEER JOIN");
        console.log(remotePeer);
        // when a peer joins
      }
      if (type === HMSPeerUpdate.PEER_LEFT) {
          // when a peer leaves
          console.log(peer,type);
          const remotePeer = await hmsInstance?.getRemotePeers();
        if(remotePeer)
        {
            setRemotePeer(remotePeer[0]);
        }
        console.log("ON LISTENER PEER LEFT");
        console.log(remotePeer);
      }
      if (type === HMSPeerUpdate.NETWORK_QUALITY_UPDATED) {
          // when a peer's network quality is changed
          console.log(peer,type);
      }
  };
  hmsInstance?.addEventListener(HMSUpdateListenerActions.ON_PEER_UPDATE, onPeerListener);



  const handleLeave = async () => {
    await hmsInstance?.leave();
    router.navigate("/join-room");
  };
  const HmsView = hmsInstance?.HmsView;

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        {/* Other User's Image */}
        <View style={styles.otherPeerContainer}>
          {HmsView &&
          localPeer?.videoTrack?.trackId &&
          !localPeer.videoTrack.isMute() ? (
            <>
              <HmsView
                style={{ height: "100%", width: "100%" }}
                trackId={localPeer?.videoTrack.trackId}
                key={localPeer?.videoTrack.trackId}
                scaleType={HMSVideoViewMode.ASPECT_FILL}
                mirror={true}
              ></HmsView>
              <Text style={styles.otherPeerName}>Alisha Jones</Text>
            </>
          ) : (
            <View>
              <Text>Video is mute</Text>
            </View>
          )}
        </View>
        {/* Your Image Container */}
        {HmsView && remotePeer &&
        remotePeer.remoteVideoTrack()?.trackId &&
        <>
            <HmsView 
            style={{ height: 100, width: 100, position:"absolute",bottom:0, right:0, }}
            trackId={remotePeer.remoteVideoTrack()?.trackId!}
            key={remotePeer.remoteVideoTrack()?.trackId!}
            scaleType={HMSVideoViewMode.ASPECT_FILL}
            mirror={true}
            ></HmsView> 
        </> 
        }
      </View>
      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.redButton} onPress={handleLeave}>
          <Feather name="phone-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyButton}>
          <Feather name="mic-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyButton}>
          <Feather name="video-off" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topView: {
    flex: 1,
    position: "relative",
  },
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
  },
  otherImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  yourImageContainer: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
  },
  yourImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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
