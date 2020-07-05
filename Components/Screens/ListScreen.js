import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import map from 'lodash/map'
import without from 'lodash/without'
import truncate from 'lodash/truncate'
import { useListContent } from "../../app/App";

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 5,
    borderRadius: 6,
  },
  container: {
    flex: 1,
    padding: 25,
  }
});

const ListScreen = ({navigation}) => {

  const [accessToken, setAccessToken] = useState(null)
  const { list, setList } = useListContent()

  const deleteItem = (item) => {
    setList(without(list, item))
    Alert.alert('Deleted')
  }

  const goTo = (item) => {
    navigation.navigate('Details', {
      place: item
    })
  }

  useEffect(() => {
    console.log('list', list)
    AsyncStorage.getItem('accessToken')
      .then((jsonAccessToken) => {
        const token = JSON.parse(jsonAccessToken)
        if (token) {
          setAccessToken(token)
        } else {
          Alert.alert('You are not authorized')
        }
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }, [list])

  return (
    <View>
      <Text style={{ fontSize: 20, marginLeft: 25, marginTop: 25, marginRight: 25 }}>
        There are your list here
      </Text>
      {accessToken && (
        <View style={styles.container}>
          {
            map(list, (item, key) => {
              return (
                <View
                  style={styles.listItem}
                  key={key}
                >
                  <Text style={{marginLeft: 10, width: '60%'}}>{truncate(item.locationName, {'length': 29})}</Text>
                  <Button
                    title='Go to'
                    onPress={() => goTo(item)}
                  />
                  <Button
                    title='delete'
                    color="red"
                    onPress={() => deleteItem(item)}
                  />
                </View>
              )
            })
          }
        </View>
      )}
    </View>
  );
};

export default React.memo(ListScreen);
