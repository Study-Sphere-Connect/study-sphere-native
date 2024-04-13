import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Post from '@/src/components/feed/post'

const posts = [
  {
    id: 1,
    name: 'Jack Kowalski',
    time: '5 minutes ago',
    location: 'Dubai, United Arab Emirates',
    content: "Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different. I know which one I hope you are, but that's not for me to decide. So, what is it? Cake or pie?",
    profilePhoto: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHNob3RzfGVufDB8fDB8fHww',
    postPhoto: 'https://plus.unsplash.com/premium_photo-1674331753968-faa2fc6648a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D',
    kudos: 1,
    comments: 10
  },
  {
    id: 2,
    name: 'Emily Rose',
    time: '10 minutes ago',
    location: 'North Carolina, USA',
    content: "He walked down the steps from the train station in a bit of a hurry knowing the secrets in the briefcase must be secured as quickly as possible. Bounding down the steps, he heard something behind him and quickly turned in a panic. There was nobody there but a pair of old worn-out shoes were placed neatly on the steps he had just come down. Had he past them without seeing them? It didn't seem possible. He was about to turn and be on his way when a deep chill filled his body.",
    profilePhoto: 'https://plus.unsplash.com/premium_photo-1677368597077-009727e906db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHNob3RzfGVufDB8fDB8fHww',
    postPhoto: 'https://images.unsplash.com/photo-1712921674421-80fdd79dbe0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D',
    kudos: 2,
    comments: 20
  },
  {
    id: 3,
    name: 'Kiri Johnson',
    time: '1 hour ago',
    location: 'Berlin, Germany',
    content: 'He heard the loud impact before he ever saw the result. It had been so loud that it had actually made him jump back in his seat. As soon as he recovered from the surprise, he saw the crack in the windshield. It seemed to be an analogy of the current condition of his life.',
    profilePhoto: 'https://images.unsplash.com/photo-1606335192038-f5a05f761b3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D',
    postPhoto: 'https://images.unsplash.com/photo-1712831713734-3b59e09516b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D',
    kudos: 3,
    comments: 30
  },
  {
    id: 4,
    name: 'Ave Smith',
    time: '20 minutes ago',
    location: 'Dubai, United Arab Emirates',
    content: "There were only two ways to get out of this mess if they all worked together. The problem was that neither was all that appealing. One would likely cause everyone a huge amount of physical pain while the other would likely end up with everyone in jail. In Sam's mind, there was only one thing to do. He threw everyone else under the bus and he secretly sprinted away leaving the others to take the fall without him.",
    profilePhoto: 'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D',
    postPhoto: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D',
    kudos: 4,
    comments: 40
  }
]

const Feed = () => {
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post {...item} />}
        keyExtractor={item => item.id.toString()} />
    </ScrollView>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  }
})