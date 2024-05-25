import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AuthButton from '@/src/components/auth-button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';

const HomePage = () => {
  useFonts({
    'Inter': require('@/assets/fonts/Inter-Regular.ttf')
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data) {
        if(data === 'true') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/profile" />; 
  }

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('@/assets/logo.png')} />
        <View style={styles.buttonStack}>
            <AuthButton title='Register' href='/register' />
            <AuthButton title='Login' href='/login' />
        </View>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    buttonStack: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    }
})