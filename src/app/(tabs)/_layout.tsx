import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'teal' }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="feed" color={color} />,
        }}
      />
      <Tabs.Screen
        name="conversations"
        options={{
          title: 'Conversations',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="meetups"
        options={{
          title: 'Meetups',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="meetup" color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: 'Subsciption',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="credit-card" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user/[id]"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
          href: null
        }}
      />
      <Tabs.Screen
        name='meetup-room'
        options={{
          href: null,
          tabBarStyle: { display: 'none'}
        }}
      />
    </Tabs>
  );
}
