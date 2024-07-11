import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Education, User } from '@/src/types';

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [education, setEducation] = useState<Education>();
  const [loading, setLoading] = useState(true);

  const handleLogout = ()=> {
    console.log("Logout is working");
    AsyncStorage.removeItem('jwt');
    AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
    router.navigate('/login')
  }

  useEffect(() => {
    const getUserData = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      try {
        const res = await axios.get(`${process.env.API_URL}/auth/userinfo`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        const educationRes = await axios.get(`${process.env.API_URL}/education/get`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });

        if(res.status === 200) {
          setUser(res.data);
        }

        if(educationRes.status === 200) {
          setEducation(educationRes.data);
        }

        setLoading(false);
      } catch (error) {
          console.error(error);
          setLoading(false);
      }
    }

    getUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp0Ei0SHzCvu20wP3C1NOmoKZcsFsQW8dKg&s' }} width={100} height={100} borderRadius={100} />
        <Text style={styles.name} >{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        { !education?.isVerified && <Pressable style={styles.button}>
          <Text style={{ color: 'white' }}>Submit Verification Request</Text>
        </Pressable>}
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
            <Text style={styles.inputText}>{education?.isVerified ? 'True' : 'False'}</Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom:40, width:'100%'}}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  email: {
    fontSize: 16,
    color: 'gray'
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:30
  },
  logoutButton: {
    backgroundColor: 'black',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  main: {
    marginTop: 20,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    flex: 1,
    marginRight: 10,
  },
  inputText: {
    flex: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
