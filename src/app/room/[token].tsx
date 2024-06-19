import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import getHMSInstance from "@/src/lib/hms";
import {
  HMSConfig,
  HMSLocalPeer,
  HMSLocalVideoTrack,
  HMSPeer,
  HMSRoom,
  HMSSDK,
  HMSSpeaker,
  HMSTrack,
  HMSTrackSource,
  HMSTrackType,
  HMSUpdateListenerActions,
  HMSVideoViewMode,
} from "@100mslive/react-native-hms";
import { CurrentUser } from "@/src/types";
import getCurrentUser from "@/src/hooks/getCurrentUser";

import {
  useCameraPermissions,
  Camera,
  useMicrophonePermissions,
} from "expo-camera";
import RoomScreen from "@/src/components/room/room-screen";
import { HMSProvider } from "@/src/lib/hmsProvider";

const MeetupRoom = () => {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphoneStatus, requestMicrophonePermission] =
    useMicrophonePermissions();
  const hmsInstanceRef = useRef<HMSSDK | null>(null);
  const [localTrack, setLocalTrack] = useState<HMSTrack | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        await requestMicrophonePermission();
        await Camera.getCameraPermissionsAsync();
        await requestCameraPermission();
        console.log(`Camera: `);
        console.log(cameraPermission);
        console.log(` Mic: `);
        console.log(`${microphoneStatus}`);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
    return () => {
      hmsInstanceRef.current?.leave();
      console.log("CLEANUP FUNCTION RUNNING");
    };
  }, []);

  useEffect(() => {
    const prejoin = async () => {
      hmsInstanceRef.current = await getHMSInstance();

      hmsInstanceRef.current.addEventListener(
        HMSUpdateListenerActions.ON_PREVIEW,
        onPreview
      );
      hmsInstanceRef.current.addEventListener(
        HMSUpdateListenerActions.ON_ERROR,
        onError
      );
      hmsInstanceRef.current.addEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        onJoinListener
      );
      // hmsInstanceRef.addEventListener(HMSUpdateListenerActions.ON_JOIN, onJoin);
      // hmsInstance obtained by build method

      if (token) {
        try {
          const hmsConfig = new HMSConfig({
            authToken: token as string,
            username: user?.name!,
          });
          hmsInstanceRef.current.preview(hmsConfig);
        } catch (e) {
          console.error(`Error Occurred ${e}`);
        }
      }
    };

    prejoin();
    return () => {
      hmsInstanceRef.current?.removeAllListeners();
    };
  }, [token, user]);

  const handleJoin = () => {
    try {
      const hmsConfig = new HMSConfig({
        authToken: token as string,
        username: user?.name!,
      });
      hmsInstanceRef.current?.join(hmsConfig);
      console.log("button clicked");
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  const handleCancel = () => {
    hmsInstanceRef.current?.leave();
    router.navigate("/join-room");
  };



  const onPreview = (data: { room: HMSRoom; previewTracks: HMSTrack[] }) => {
    // You can use `previewTracks` to render preview for the local peer
    const regularAudioTrack = data.previewTracks.find((previewTrack) => {
      return (
        previewTrack.source === HMSTrackSource.REGULAR &&
        previewTrack.type === HMSTrackType.AUDIO
      );
    });
    const regularVideoTrack = data.previewTracks.find((previewTrack) => {
      return (
        previewTrack.source === HMSTrackSource.REGULAR &&
        previewTrack.type === HMSTrackType.VIDEO
      );
    });

    if (regularVideoTrack) {
      setLocalTrack(regularVideoTrack);
    }
  };

  const onJoinListener = (data: {
    localPeer: HMSPeer;
    remotePeers: HMSPeer[];
  }) => {
    console.log("Meet Joined", data);
    setIsJoined(true);
    // gets triggered when join is successful. You can navigate to other screens.
    // use these objects to update your local and remote peers.
  };

  const onError = (data: any) => {
    console.log(data);
  };

  const HmsView = hmsInstanceRef.current?.HmsView;

  useEffect(() => {
    console.log("Local Track");
    console.log(localTrack);
  }, [localTrack]);

  // Get Local Video Track from preview tracks
  return (
    <HMSProvider>
      {!isJoined ? (
        <>
          {localTrack && HmsView ? (
            <View style={styles.container}>
              <View style={styles.topView}>
                {/* Other User's Image */}
                <View style={styles.otherImageContainer}>
                  {HmsView &&
                    localTrack &&
                    localTrack.trackId &&
                    !localTrack.isMute() && (
                      <HmsView
                        style={{ height: "100%", width: "100%" }}
                        trackId={localTrack?.trackId}
                        key={localTrack.id}
                        scaleType={HMSVideoViewMode.ASPECT_FILL}
                        mirror={true}
                      ></HmsView>
                    )}
                  <Text style={styles.otherUserName}>Alisha Jones</Text>
                </View>
              </View>
              {/* Bottom Bar */}
              <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.greyButton}>
                  <Feather name="mic-off" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.greyButton}>
                  <Feather name="video-off" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commonButton}
                  onPress={handleJoin}
                >
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Join
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
              }}
            >
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
          )}
        </>
      ) 
      :
      (
        <RoomScreen/>
      )
    }
    </HMSProvider>
  );
};

export default MeetupRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topView: {
    flex: 1,
    position: "relative",
  },
  otherImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  commonButton: {
    display: "flex",
    backgroundColor: "white",
    width: 90,
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    display: "flex",
    borderColor: "white",
    borderWidth: 1,
    width: 90,
    padding: 10,
    borderRadius: 10,
  },
  otherUserName: {
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
