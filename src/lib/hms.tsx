// hmsInstance.ts
import { HMSSDK } from "@100mslive/react-native-hms";

let hmsInstance: HMSSDK | null = null;

const getHMSInstance = async () => {
  if (!hmsInstance) {
    hmsInstance = await HMSSDK.build({});
  }
  return hmsInstance;
};

export default getHMSInstance;
