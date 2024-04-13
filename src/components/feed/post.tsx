import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import KudoButton from './kudo-button'
import CommentButton from './comment-button'
import PostDetails from './post-details'

interface PostProps {
    id: number
    name: string
    time: string
    location: string
    content: string
    profilePhoto: string
    postPhoto: string
    kudos: number
    comments: number
}

const Post = ({ ...post }: PostProps) => {
  return (
    <View style={styles.card}>
        <View style={styles.header}>
            <Image source={{ uri: post.profilePhoto }} style={styles.profilePhoto} />
            <View>
                <View style={styles.nameTime}>
                    <Text style={styles.name}>{post.name}</Text>
                    <Text style={styles.color}>•</Text>
                    <Text style={styles.color}>{post.time}</Text>
                </View>
                <Text style={styles.color}>{post.location}</Text>
            </View>
        </View>

        <View style={styles.content}>
            <Text>
                {post.content}
            </Text>

            <Image source={{ uri: post.postPhoto }} style={{ width: '100%', height: 200}} />

            <PostDetails kudos={post.kudos} comments={post.comments} />

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <KudoButton />
                <CommentButton />
            </View>
        </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    profilePhoto: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    name: {
        fontWeight: 'bold'
    },
    nameTime: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    color: {
        color: 'gray'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        marginTop: 10
    }
})