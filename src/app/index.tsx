import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AuthButton from '@/src/components/auth-button'

const HomePage = () => {
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