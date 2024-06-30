import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubscriptionScreen from '../../components/subscription/post';
import { Linking } from 'react-native';
const Subscription: React.FC = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<boolean>(false);

  const saveSubscription = async () => {
    let price: string;
    let plan: string;

    if (selectedSubscription !== null && !activeSubscription) {
      if (selectedSubscription === 0) {
        price = 'price_1Ouu31RoFYuuQacWWbSCnQsF';
        plan = 'Basic';
      } else if (selectedSubscription === 1) {
        price = 'price_1Ouu3MRoFYuuQacWKfC8GZPp';
        plan = 'Standard';
      } else {
        price = 'price_1Ouu3mRoFYuuQacWqFGMFY0L';
        plan = 'Premium';
      }
      console.log(plan);
      await callStripe(price);
      await createSubscription(plan);
    } else {
      setError('You already have an active subscription.');
    }
  };

  const createSubscription = async (plan:string) => {
    const jwt = await AsyncStorage.getItem('jwt');
    let formData = new FormData();

    if(plan) {
      formData.append('plan', plan);
    }
    console.log(formData)
    try {
      const res = await axios.post(`${process.env.API_URL}/subscription/create`,formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const callStripe = async (price:string) => {
    const jwt = await AsyncStorage.getItem('jwt');
    let formData = new FormData();

    if(price) {
        formData.append('price', price);
      }
      console.log(formData)
    try {
      const res = await axios.post(`${process.env.API_URL}/subscription/stripe`, formData,{
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',

        },
      });

      if (res.status === 200) {
        console.log(res.data);
        Linking.openURL(res.data.url);  

      }
    } catch (error) {
      console.error('Error calling Stripe:', error);
    }
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      const jwt = await AsyncStorage.getItem('jwt');

      try {
        const res = await axios.get(`${process.env.API_URL}/subscription`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (res.status === 200) {
          const { status } = res.data;
          if (status === 'ACTIVE') {
            setActiveSubscription(true);
          } else {
            setActiveSubscription(false);
          }
          console.log(res.data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };
    fetchSubscription();
  }, []);

  return (
    <SubscriptionScreen
      selectedSubscription={selectedSubscription}
      setSelectedSubscription={setSelectedSubscription}
      saveSubscription={saveSubscription}
      error={error}
    />
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});