import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const MeetupRoom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        {/* Other User's Image */}
        <View style={styles.otherImageContainer}>
          <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D' }} style={styles.otherImage} />
          <Text style={styles.otherUserName}>Alisha Jones</Text>
        </View>
        {/* Your Image Container */}
        <View style={styles.yourImageContainer}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1627161684458-a62da52b51c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGhlYWRzaG90fGVufDB8fDB8fHww' }} style={styles.yourImage} />
        </View>
      </View>
      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.redButton}>
          <Feather name="phone-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyButton}>
          <Feather name="mic-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.greyButton}>
          <Feather name="video-off" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MeetupRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topView: {
    flex: 1,
    position: 'relative',
  },
  otherImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  otherUserName: {
    position: 'absolute',
    color: 'white',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
    top: 30,
    left: 30
  },
  otherImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  yourImageContainer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  yourImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 100,
  },
  greyButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 100,
  },
})
