import 'react-native-gesture-handler';

import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 40
  },
  text1: {
    marginBottom: 30,
    fontSize: 20,
  },
  text2: {
    fontSize: 18,
  },
  text3: {
    marginTop: 300,
    fontSize: 18,
    color: 'grey',
  },
  text4: {

  },

});

const HomeScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.text1}>HistoricalPLaces - это приложение, которое поможет вам окунуться в мир старой эпохи, узнать много нового и просто приятно провести время.</Text>
      <Text style={styles.text2}>Приготовьтесь окунуться в мир захватывающей истории!</Text>
      <Text style={styles.text3}>Перейдите на раздел с картой, чтобы посмотреть все достопремечательности</Text>
    </View>
  );
};

export default HomeScreen;
