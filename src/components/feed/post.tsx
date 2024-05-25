import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import KudoButton from "./kudo-button";
import CommentButton from "./comment-button";
import { PostWithExtras } from "@/src/types/posts";
import { UserCircle } from "@tamagui/lucide-icons";
import TimeAgo from "./time-ago";
import ShareButton from "./share-button";

const Post = ({ post }: { post: PostWithExtras }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText((prevState) => !prevState);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {post.user.image ? (
          <Image
            source={{ uri: post.user.image }}
            style={styles.profilePhoto}
          />
        ) : (
          <UserCircle size={40} />
        )}
        <View>
          <View style={styles.nameTime}>
            <Text style={styles.name}>{post.user.name}</Text>
            <Text style={styles.color}>•</Text>
            <TimeAgo createdAt={post.createdAt} />
          </View>
          <Text style={styles.color}>United Arab Emirates</Text>
        </View>
      </View>

      <View style={styles.content}>
        {post.content.length > 100 && !showFullText ? (
          <>
            <Text numberOfLines={3}>{post.content.substring(0, 100)}</Text>
            <TouchableOpacity onPress={toggleShowFullText}>
              <Text style={styles.viewMore}>View More</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text>{post.content}</Text>
            {showFullText && (
              <TouchableOpacity onPress={toggleShowFullText}>
                <Text style={styles.viewMore}>Show Less</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {post.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            style={{ width: "100%", height: 200 }}
          />
        )}

        <View style={styles.postActions}>
          <View style={styles.kudoComment}>
            <KudoButton post={post} userId={post.userId} />
            <CommentButton />
          </View>
          <ShareButton />
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    fontWeight: "bold",
  },
  nameTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  color: {
    color: "gray",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 10,
  },
  postActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kudoComment: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  viewMore: {
    color: "grey",
    textDecorationLine: "underline",
  },
});
