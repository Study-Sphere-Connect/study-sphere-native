import { ImagePlus } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image, StyleSheet, Alert, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface ImageType {
  uri: string,
  name: string,
  type: string
}

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<ImageType | null>({ uri: '', name: '', type: '' });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      allowsEditing: true, 
      aspect: [4, 3],
      quality: 1,
    })

    if(!result.canceled) {
      const data = result.assets[0];

      const uuid = uuidv4();
      const fileExtension = data.uri.substring(data.uri.lastIndexOf('.') + 1);
      const fileName = `${uuid}.${fileExtension}`;
      const fileType = `image/${fileExtension}`;

      setImage({
        uri: data.uri,
        name: fileName,
        type: fileType
      });
    }
  }

  const handleCreatePost = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      let formData = new FormData();

      if(image && image.uri) {
        formData.append('content', content);
        formData.append('file', {
          uri: image.uri,
          name: image.name,
          type: image.type
        })
      }

      const res = await axios.post(`${process.env.API_URL}/post/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwt}`
        }
      })

      if(res.status === 201) {
        Alert.alert('Post created successfully');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="What's on your mind?" style={styles.content} value={content} onChangeText={setContent} />
      { image?.uri && <Image source={{ uri: image.uri }} style={styles.demoImage} />}
      <View style={styles.submitContainer}>
        <TouchableOpacity onPress={pickImage}>
            <ImagePlus />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleCreatePost}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  content: {
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
  },
  demoImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    display: 'flex',
    backgroundColor: 'black',
    width: 80,
    padding: 10,
    borderRadius: 10,
  },
});

export default CreatePost;
