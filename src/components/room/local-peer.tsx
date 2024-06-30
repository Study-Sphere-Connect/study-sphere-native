import { useHMS } from "@/src/lib/hmsProvider";
import { View, Text, StyleSheet } from "react-native";
import { HMSLocalPeer, HMSVideoViewMode, useHmsViewsResolutionsState } from "@100mslive/react-native-hms";

interface LocalPeerProps{
    localPeer: HMSLocalPeer
}

const LocalPeer = ({localPeer}:LocalPeerProps)=> {
    const hmsInstance = useHMS();
    const HmsView = hmsInstance?.HmsView;
    return(
        <>
        {HmsView && localPeer && localPeer.videoTrack ?  
            <>
            <HmsView
            style={{
                height: 150,
                width: 100,
                position: "absolute",
                bottom: 0,
                right: 0,
            }}
              trackId={localPeer.videoTrack.trackId}
              key={localPeer.videoTrack.trackId}
              scaleType={HMSVideoViewMode.ASPECT_FILL}
              mirror={true}
              ></HmsView>
              </>
              :
              <View><Text>Your Camera is Muted</Text></View>
        }
        </>
    )
}

export default LocalPeer;