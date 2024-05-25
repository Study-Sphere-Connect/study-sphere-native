import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '@/src/components/feed/post'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PostWithExtras } from '@/src/types/posts'
import CreatePost from '@/src/components/feed/create-post'

const Feed = () => {
  const [posts, setPosts] = useState<PostWithExtras[]>();

  const fetchPosts = async () => {
    const jwt = await AsyncStorage.getItem('jwt');

    try {
      const res = await axios.get(`${process.env.API_URL}/post`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      if(res.status === 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  };

  useEffect(() => {
    fetchPosts();
  
  }, []);

  return (
    <>
      <CreatePost />
      <FlatList style={styles.container} data={posts} renderItem={({ item }) => <Post post={item} />} keyExtractor={item => item.id.toString()} extraData={posts} />
    </>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  }
})