import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Heart } from '@tamagui/lucide-icons';
import { PostWithExtras } from '@/src/types/posts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface KudoButtonProps {
  post: PostWithExtras;
  userId: string;
}

const KudoButton = ({ post, userId }: KudoButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [kudosCount, setKudosCount] = useState(post.kudos.length);

  useEffect(() => {
    // Check if the post is already liked by the user
    const isLiked = post.kudos.some(kudo => kudo.userId === userId);
    setLiked(isLiked);
  }, [post.kudos, userId]);

  const handleKudo = async () => {
    try {
      const jwt = await AsyncStorage.getItem('jwt');

      if (liked) {
        // Unlike the post if already liked
        setLiked(false);
        setKudosCount(prevCount => prevCount - 1);
        const res = await axios.post(
          `${process.env.API_URL}/post/like/${post.id}`, {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (res.status === 200) {
          console.log('Post unliked successfully');
        }
      } else {
        // Like the post if not liked
        setLiked(true);
        setKudosCount(prevCount => prevCount + 1);
        const res = await axios.post(
          `${process.env.API_URL}/post/like/${post.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (res.status === 200) {
          console.log('Post liked successfully');
        }
      }
    } catch (error) {
      console.error('Error while liking/unliking the post:', error);
      // Revert UI changes on error
      if (liked) {
        setLiked(false);
        setKudosCount(prevCount => prevCount + 1);
      } else {
        setLiked(true);
        setKudosCount(prevCount => prevCount - 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleKudo}>
        <Heart size={24} fill={liked ? 'red' : 'none'} color={ liked ? "red": "black"} />
      </TouchableOpacity>
      <Text>{kudosCount}</Text>
    </View>
  );
};

export default KudoButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
