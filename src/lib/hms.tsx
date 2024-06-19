// hmsInstance.ts
import { HMSSDK } from "@100mslive/react-native-hms";

let hmsInstance: HMSSDK | null = null;

const getHMSInstance = async () => {
  if (!hmsInstance) {
    hmsInstance = await HMSSDK.build({});
    console.log("new Instance Gets Created")
  }
  return hmsInstance;
};

export default getHMSInstance;
