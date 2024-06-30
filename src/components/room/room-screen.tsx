import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useHMS } from "@/src/lib/hmsProvider";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  HMSLocalPeer,
  HMSPeer,
  HMSPeerUpdate,
  HMSRemotePeer,
  HMSTrack,
  HMSTrackUpdate,
  HMSUpdateListenerActions,
  HMSVideoViewMode,
} from "@100mslive/react-native-hms";
import ControlBar from "./controlbar";
import RemotePeer from "./remote-peer";
import LocalPeer from "./local-peer";

const RoomScreen = () => {
  const router = useRouter();
  const hmsInstance = useHMS();

  const [localPeer, setLocalPeer] = useState<HMSLocalPeer | null>(null);
  const [remotePeer, setRemotePeer] = useState<HMSRemotePeer | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeers = async () => {
      if (hmsInstance) {
        // Use the hms instance
        const remotePeer = await hmsInstance?.getRemotePeers();
        setRemotePeer(remotePeer[0]);
        const localPeer = await hmsInstance?.getLocalPeer();
        setLocalPeer(localPeer);
      }
    };

    fetchPeers();
  }, [hmsInstance]);

  useEffect(() => {
    console.log("Local Peer State Changes", localPeer);
  }, [localPeer]);
  useEffect(() => {
    console.log("REMOTE PEER STATE CHANGES", remotePeer);
  }, [remotePeer]);

  const onPeerListener = async ({
    peer,
    type,
  }: {
    peer: HMSPeer;
    type: HMSPeerUpdate;
  }) => {
    if (type === HMSPeerUpdate.PEER_JOINED) {
      console.log(peer, type);
      const remotePeer = await hmsInstance?.getRemotePeers();
      if (remotePeer) {
        setRemotePeer(remotePeer[0]);
        if (remotePeer[0].videoTrack?.trackId) {
          setRemotePeerId(remotePeer[0].videoTrack?.trackId);
        }
      }
      console.log("ON LISTENER PEER JOIN");
      console.log(remotePeer);
      // when a peer joins
    }
    if (type === HMSPeerUpdate.PEER_LEFT) {
      // when a peer leaves
      console.log(peer, type);
      const remotePeer = await hmsInstance?.getRemotePeers();
      if (remotePeer) {
        setRemotePeer(remotePeer[0]);
      }
      console.log("ON LISTENER PEER LEFT");
      console.log(remotePeer);
    }
    if (type === HMSPeerUpdate.NETWORK_QUALITY_UPDATED) {
      // when a peer's network quality is changed
      console.log(peer, type);
    }
  };
  hmsInstance?.addEventListener(
    HMSUpdateListenerActions.ON_PEER_UPDATE,
    onPeerListener
  );
  // hms instance acquired from build method

  const onTrackListener = ({
    track,
    peer,
    type,
  }: {
    track: HMSTrack;
    peer: HMSPeer;
    type: HMSTrackUpdate;
  }) => {
    if (type === HMSTrackUpdate.TRACK_ADDED) {
      // when track is added
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_REMOVED) {
      // when track is removed
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_MUTED) {
      // when track is muted
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_UNMUTED) {
      // when track is unmuted
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_DESCRIPTION_CHANGED) {
      // when track's description is changed
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_DEGRADED) {
      // when track is degraded
      console.log(track, peer, type);
    }
    if (type === HMSTrackUpdate.TRACK_RESTORED) {
      // when track is restored
      console.log(track, peer, type);
    }
  };

  hmsInstance?.addEventListener(
    HMSUpdateListenerActions.ON_TRACK_UPDATE,
    onTrackListener
  );

  const HmsView = hmsInstance?.HmsView;

  return (
    <View style={styles.container}>
      {HmsView && (
        <View style={styles.topView}>
          {/* Other User's View */}
          {remotePeer && 
          <View style={styles.otherPeerContainer}>
            <RemotePeer remotePeer={remotePeer} />
          </View>
          }
          {/* Your View Container */}
          {localPeer?.videoTrack?.trackId && !localPeer.videoTrack.isMute() ? (
            <LocalPeer localPeer={localPeer} />
          ) : null}
        </View>
      )}
      {/* Bottom Bar */}
      <ControlBar />
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
});
