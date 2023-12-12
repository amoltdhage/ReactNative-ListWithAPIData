// PostItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PostItemProps {
  id: number;
  title: string;
  body: string;
}

const PostItem: React.FC<PostItemProps> = ({ id, title, body }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemId}>{`ID: ${id}`}</Text>
    <Text style={styles.itemTitle}>{`Title: ${title}`}</Text>
    <Text style={styles.itemBody}>{`Body: ${body}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemBody: {
    fontSize: 14,
    color: '#555',
  },
});

export default PostItem;
