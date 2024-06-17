import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CurrentUser } from "../types";

const getCurrentUser = async () => {
    const jwt = await AsyncStorage.getItem("jwt");
    if(jwt)
    {
        const user = jwtDecode<CurrentUser>(jwt!);
        return user;
    }
    return null;
}

export default getCurrentUser;