import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

Geocoder.init("AIzaSyAdf8HPKslQiTTZWtQYTdZgs__5he_lmfw");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  calloutLink: {
    color: '#1AAE9F',
  },
  flag: {
    width: 30,
    height: 30,
  }
});

const camera = {
  center: {
    latitude: 47.2153657,
    longitude: 38.9285216,
  },
  pitch: 0,
  heading: 0,
  altitude: 0,
  zoom: 13,
}

const MapScreen = ({navigation}) => {

  const [mapData, setMapData] = useState([])
  const [loading, setLoading] = useState(false)

  const getLatLng = async (locations) => {
    let places = []
    for (let place of locations) {
      try {
        const data = await Geocoder.from(place.location)
        const latLng = data.results[0].geometry.location
        places.push({
          ...place,
          latLng
        })
      }
      catch (error) {
        console.log('error', error)
      }
    }
    setLoading(false)
    setMapData(places)
  }

  useEffect(() => {
    setLoading(true)
    axios.get('https://diplom-backend.herokuapp.com/api/places/getPlaces?cityName=Таганрог')
      .then((response) => {
        getLatLng(response.data)
      })
      .catch((error) => {
        console.log('get places error', error)
      })
  }, [])

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1AAE9F" />
        </View>
      )}
      {!loading && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={'standard'}
          camera={camera}
          showsUserLocation
          followsUserLocation
        >
          {/* <GooglePlacesAutocomplete
            style={{
              textInputContainer : {
                padding: 0,
                margin: 0,
              },
              textInput: {
                padding: 0,
                margin: 0,
                height: 50,
              },
            }}
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            placeholder='Type city or feature'
            fetchDetails
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyAHJ4SFb2DaLLub-JY43VhkpSlCDnCh4wc',
              language: 'en',
            }}
          /> */}
          {!isEmpty(mapData) && map(mapData, (marker, key) => {
            return (
              <Marker
                key={key}
                title={'Technical university'}
                description={'South Federal University'}
                coordinate={{latitude: marker.latLng.lat, longitude: marker.latLng.lng}}
              >
                <Callout onPress={() => navigation.navigate('Details', {
                  place: marker
                })}
                >
                  <Text>{marker.locationName}</Text>
                  <Text style={styles.calloutLink}>(Tap to show full info)</Text>
                </Callout>
              </Marker>
            )
          })}
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
