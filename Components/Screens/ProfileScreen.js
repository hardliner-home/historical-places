import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-community/async-storage';
import isEmpty from 'lodash/isEmpty'

import { useListContent } from "../../app/App";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    logout: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    userAvatar: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        height: 100,
        width: 100,
        borderRadius: 50,
    },
});

const credentials = require('../../app/auth0-configuration');
const auth0 = new Auth0(credentials);

const ProfileScreen = () => {

    const { list, setList } = useListContent()

    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)

    // const getData = async () => {
    //     let token = null
    //     let userData = null
    //     try {
    //         token = await AsyncStorage.getItem('accessToken')
    //         userData = await AsyncStorage.getItem('userData')
    //     }
    //     catch (error) {
    //       Alert.alert('error', error);
    //     }
    //
    //     setAccessToken(isEmpty(token) ? null : token)
    //     setUser(isEmpty(userData) ? null : userData)
    //
    //     storeUserData(userData)
    //     storeToken(token)
    // }

    const storeToken = async (token) => {
        try {
          await AsyncStorage.setItem('accessToken', JSON.stringify(token))
        } 
        catch (error) {
            Alert.alert('Error with save AsyncStorage')
        }
    }

    const storeUserData = async (userData) => {
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(userData))
        } 
        catch (error) {
            Alert.alert('Error with save AsyncStorage')
        }
    }

    const onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email'
            })
            .then(credentials => {
                setAccessToken(credentials.accessToken)
                storeToken(credentials.accessToken)
                Alert.alert('You are successfully logged in')

                auth0.auth.userInfo({
                    token: credentials.accessToken,
                }).then(success => {
                    storeUserData(success)
                    setUser(success)
                })
            })
            .catch(error => {
                Alert.alert('Login Error', error)
            })
    }

    const onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(() => {
                setAccessToken(null)
                setUser(null)
                setList([])
                AsyncStorage.clear()
                Alert.alert('You are logged out')
            })
            .catch(error => {
                Alert.alert('Logout error', error)
            });
    };

    useEffect(() => {
        // getData()
        AsyncStorage.clear()
    }, [])

    return (
        <View style = { styles.container }>
            {!isEmpty(user) && !isEmpty(accessToken) && (
                <View style={styles.logout}>
                    <Image 
                        style={styles.userAvatar}
                        source={{ uri: user.picture }} 
                    />
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                    <Button 
                        style={{justifyContent: 'flex-end'}}
                        onPress={onLogout}
                        title='Log Out'
                    />
                </View>
            )}
            {!user && (
                <View style={styles.login}>            
                    <Text>You are not logged in</Text>
                    <Button 
                        onPress={onLogin}
                        title='Log In'
                    />
                </View>
            )}
        </View >
    )
}

export default ProfileScreen;