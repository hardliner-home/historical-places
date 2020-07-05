import 'react-native-gesture-handler';
// React Core
import React, { useState, useEffect } from 'react';
// Libraries
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import map from 'lodash/map'
import concat from 'lodash/concat'
import indexOf from 'lodash/indexOf'
import reverse from 'lodash/reverse'
import { useListContent } from '../../app/App'
import ReadMore from 'react-native-read-more-text';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';
// Styles 
import { style } from '../../assets/styles/detailsScreen'
// Fakes
// Components
import Comments from '../comments/Comments';
// Images
import star from "../../assets/icons/details/star.png"
import Axios from 'axios';

const styles = StyleSheet.create(style)

const DetailsScreen = ({ route, navigation }) => {

  const [accessToken, setAccessToken] = useState(null)
  const { list, setList } = useListContent()
  const { place } = route.params

  const imageRenderer = () => {
    return map(place.Images, (image, key) => {
      return <Image source={{ uri: image }} key={key}/>
    })
  }
  const truncatedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Read more
      </Text>
    );
  }
  const revealedFooter = (handlePress) => {
    return (
      <Text style={styles.readMore} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  const sendFavorite = (data, token) => {
    const isExist = indexOf(list, data)
    if (isExist < 0)  {
      setList(concat(list, data))
      Alert.alert('Added')
    } else {
      Alert.alert('Already in Your list')
    }
  }

  const addToFavorite = () => {
    if (!accessToken) {
      Alert.alert('You are not authorized')
    } else {
      sendFavorite(place, accessToken)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then((jsonAccessToken) => {
        const token = JSON.parse(jsonAccessToken)
        if (token) {
          setAccessToken(token)
        }
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text onPress={() => addToFavorite()}>Add to favorites +</Text>
        <Text style={styles.placeName}>{place.locationName}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, marginBottom: 2 }}>Place rating: </Text>
          <Rating
            type='custom'
            readonly={true}
            startingValue={place.rating / 2}
            ratingCount={5}
            imageSize={16}
            ratingImage={star}
            ratingColor={'#B471EA'}
            ratingBackgroundColor={'lightgrey'}
          />
        </View>
        {place.visitCount && place.visitCount > 0 && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Place visited: {place.visitCount}</Text>
        )}
        <ViewPager style={styles.viewPager} initialPage={0}>
          {imageRenderer()}
        </ViewPager>
        <View style={styles.separator}/>
        <Animated.View>
          <ReadMore
            numberOfLines={5}
            renderTruncatedFooter={truncatedFooter}
            renderRevealedFooter={revealedFooter}
          >
            <Text style={styles.description}>
              {place.locationDescription}
            </Text>
          </ReadMore>
        </Animated.View>
        <View style={styles.separator}/>
        <Comments
          buttonStyle={styles.showComments}
          textStyle={styles.showCommentsText}
          placeId={place.id}
        />
      </ScrollView>
    </View>
  )
}

export default DetailsScreen;
