import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Education, User } from "@/src/types";
import { useLocalSearchParams } from "expo-router";

const UserPage = () => {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User>();
  const [education, setEducation] = useState<Education>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    const jwt = await AsyncStorage.getItem("jwt");

    try {
      const res = await axios.get(`${process.env.API_URL}/auth/user/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const educationRes = await axios.get(
        `${process.env.API_URL}/education/get`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (res.status === 200 && educationRes.status === 200) {
        setUser(res.data);
        setEducation(educationRes.data);
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      { loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <View style={styles.header}>
            <Image
              source={{
                uri:
                  user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp0Ei0SHzCvu20wP3C1NOmoKZcsFsQW8dKg&s",
              }}
              width={100}
              height={100}
              borderRadius={100}
            />
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            {!education?.isVerified && (
              <Pressable style={styles.button}>
                <Text style={{ color: "white" }}>
                  Submit Verification Request
                </Text>
              </Pressable>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Chat Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Request Meetup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Educational Information</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Institution</Text>
                <Text style={styles.inputText}>{education?.institution}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Country</Text>
                <Text style={styles.inputText}>{education?.country}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Level</Text>
                <Text style={styles.inputText}>{education?.level}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Major</Text>
                <Text style={styles.inputText}>{education?.major}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Start Year</Text>
                <Text style={styles.inputText}>{education?.startYear}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>End Year</Text>
                <Text style={styles.inputText}>{education?.endYear}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Is Verified</Text>
                <Text style={styles.inputText}>
                  {education?.isVerified == true ? "True" : "False"}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  main: {
    marginTop: 20,
    width: "100%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    flex: 1,
    marginRight: 10,
  },
  inputText: {
    flex: 3,
  },
});
