import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

// Mock subscription data
const mockSubscriptions = [
  { id: 1, name: 'Basic', price: '$10/month', features: ['5 meetings per month'], color: '#bfdbfe' },
  { id: 2, name: 'Standard', price: '$20/month', features: ['10 meetings per month'], color: '#bbf7d0' },
  { id: 3, name: 'Premium', price: '$30/month', features: ['20 meetings per month'], color: '#fef3c7' },
];

interface SubscriptionScreenProps {
  selectedSubscription: number | null;
  setSelectedSubscription: (index: number) => void;
  saveSubscription: () => void;
  error: string | null;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  selectedSubscription,
  setSelectedSubscription,
  saveSubscription,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Subscription</Text>
      <FlatList
        data={mockSubscriptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.subscriptionContainer}>
            <View style={[styles.subscriptionBox, { backgroundColor: item.color }]}>
              <Text style={styles.subscriptionName}>{item.name}</Text>
              <Text style={styles.subscriptionPrice}>{item.price}</Text>
              <View>
                {item.features.map((feature, featureIndex) => (
                  <Text key={featureIndex} style={styles.subscriptionFeature}>{feature}</Text>
                ))}
              </View>
              <TouchableOpacity onPress={() => setSelectedSubscription(index)} style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {selectedSubscription !== null && (
        <View style={styles.selectedContainer}>
          <View style={styles.selectedBox}>
            <Text style={styles.subscriptionName}>Selected Subscription</Text>
            <Text style={styles.subscriptionPrice}>Name: {mockSubscriptions[selectedSubscription].name}</Text>
            <Text style={styles.subscriptionPrice}>Price: {mockSubscriptions[selectedSubscription].price}</Text>
            <View>
              {mockSubscriptions[selectedSubscription].features.map((feature, featureIndex) => (
                <Text key={featureIndex} style={styles.subscriptionFeature}>{feature}</Text>
              ))}
            </View>
            <TouchableOpacity onPress={saveSubscription} style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  subscriptionBox: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    maxWidth: 300,
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subscriptionPrice: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  subscriptionFeature: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectButton: {
    marginTop: 16,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  selectedBox: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#f7f7f7',
  },
  subscribeButton: {
    marginTop: 16,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 8,
    color: '#f00',
    textAlign: 'center',
  },
});

export default SubscriptionScreen;