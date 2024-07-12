import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface WalletInfo {
  balance: number;
  currency: string;
}

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>();
  const [loading, setLoading] = useState(true);
  const getWalletInfo = async () => {
    setLoading(true);
    try {
      const jwt = await AsyncStorage.getItem("jwt");

      const res = await axios.get(`${process.env.API_URL}/wallet/get`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (res.status === 200) {
        setWalletInfo(res.data);
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleCreateWallet = async() => {
    try
    {
        const jwt = await AsyncStorage.getItem("jwt");
        console.log(jwt);
        const res = await axios.post(`${process.env.API_URL}/wallet/create`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
    });
      console.log("Showing Data");
      console.log(res.data);
      if (res.status === 200) {
        setWalletInfo(res.data);
        }
    console.log(res.data);
    }
    catch(ex)
    {
        console.error(ex);
    } 
  };

  useEffect(() => {
    getWalletInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {walletInfo ? (
        <View style={styles.walletCard}>
          <View style={styles.currencyInfo}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>Amount: </Text>
            <Text>{walletInfo.balance} $</Text>
          </View>
          <View style={styles.currencyInfo}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>Currency: </Text>
            <Text>{walletInfo.currency}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCreateWallet}>
          <Text style={styles.buttonText}>Create Wallet</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  walletCard: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  currencyInfo: {
    fontSize: 30,
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});
