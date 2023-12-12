// ListWithData.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import PostItem from './PostItem';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 20;

const ListWithData: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchButtonDisabled, setFetchButtonDisabled] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showClearButton, setShowClearButton] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setFetchButtonDisabled(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`);
      const jsonData: Post[] = await response.json();
      setData((prevData) => [...prevData, ...jsonData]);
      setTotalPages(Math.ceil(Number((response.headers as any).get('X-Total-Count')) / PAGE_SIZE));
      setShowClearButton(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setFetchButtonDisabled(false);
    }
  };

  const handleFetchButtonClick = () => {
    setPage(1);
    setData([]);
    setShowClearButton(false);
    fetchData();
  };

  const handleClearButtonClick = () => {
    setData([]);
    setFetchButtonDisabled(false);
    setPage(1);
    setShowClearButton(false);
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, page, totalPages]);

  const renderItem = ({ item }: { item: Post }) => <PostItem {...item} />;

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts from API:</Text>
      <TouchableOpacity
        style={[styles.button, fetchButtonDisabled && styles.disabledButton]}
        onPress={handleFetchButtonClick}
        activeOpacity={0.7}
        disabled={fetchButtonDisabled}
      >
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {showClearButton && (
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClearButtonClick}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Clear Fetched Data</Text>
        </TouchableOpacity>
      )}
      {loading && <ActivityIndicator size="large" style={styles.activityIndicator} />}
      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#B0C4DE', // LightSteelBlue
  },
  clearButton: {
    backgroundColor: '#DC3545', // Crimson
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default ListWithData;
