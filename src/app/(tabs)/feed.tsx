import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '@/src/components/feed/post'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PostWithExtras } from '@/src/types/posts'
import CreatePost from '@/src/components/feed/create-post'

const Feed = () => {
  const [posts, setPosts] = useState<PostWithExtras[]>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const jwt = await AsyncStorage.getItem('jwt');

    setLoading(true);

    try {
      const res = await axios.get(`${process.env.API_URL}/post`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      if(res.status === 200) {
        setPosts(res.data);
        setLoading(false);
        setRefreshing(false);
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
      {
        loading ?
          <ActivityIndicator size="large" color="black" style={styles.loader} />
      : <>
        <CreatePost />
        <FlatList style={styles.container} data={posts} renderItem={({ item }) => <Post post={item} />} keyExtractor={item => item.id.toString()} extraData={posts} refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
          />
        } />
      </>
      }
    </>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  loader: {
    marginTop: 20
  }
})