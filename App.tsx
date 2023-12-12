import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const jsonData: Post[] = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Data from API:</Text>
      {data.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <Text style={styles.itemText}>{`id: ${item.id}`}</Text>
          <Text style={styles.itemText}>{`title: ${item.title}`}</Text>
          <Text style={styles.itemText}>{`body: ${item.body}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 20,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default App;
