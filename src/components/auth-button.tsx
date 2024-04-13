import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface AuthButtonProps {
  title: string,
  href: string,
}

const AuthButton = ({ title, href } : AuthButtonProps) => {
  return (
    <Link href={href} style={styles.button}>
        {title}
    </Link>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  button: {
    color: 'white',
    backgroundColor: 'black',
    textAlign: 'center',
    padding: 10,
    width: 100,
    borderRadius: 8,
  }
})