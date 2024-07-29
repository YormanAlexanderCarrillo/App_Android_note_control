import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NotificationList({ tasksNotification }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasksNotification}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  subtitle:{
    fontSize: 14
  }
});