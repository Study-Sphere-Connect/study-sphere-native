import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import getCurrentUser from '@/src/hooks/getCurrentUser';
import { CurrentUser } from '@/src/types';

export default function TabLayout() {
  const [user, setUser] = useState<CurrentUser | null>();
  useEffect(()=>{
    const getUserInfo = async ()=> {
      try
      {
        const user = await getCurrentUser();
        console.log(user);
        if(user)
          setUser(user);
      }
      catch(ex)
      {
        console.log(ex);
      }
    }

    getUserInfo();
    
    console.log("Use Effect of tab working");
  },[])
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
      name="wallet"
      options={{
        title: 'Wallet',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
      }}
      />
    </Tabs>
  );
}
