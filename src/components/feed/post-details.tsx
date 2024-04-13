import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PostDetailsProps {
  kudos: number
  comments: number
}

const PostDetails = ({ kudos, comments }: PostDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detail}>{kudos} Like</Text>
      <Text style={styles.detail}>{comments} Comments</Text>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingBottom: 10,
    },
    detail: {
        color: 'grey',
        fontSize: 12,
    }
})