import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import map from 'lodash/map'
import concat from 'lodash/concat'
import reverse from 'lodash/reverse'
import SingleComment from './SingelComment'
import { Rating } from 'react-native-ratings';
import star from "../../assets/icons/details/star.png"
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
// import Auth0 from 'react-native-auth0';

const credentials = require('../../app/auth0-configuration');
// const auth0 = new Auth0(credentials);

const Comments = ({buttonStyle, textStyle, placeId}) => {

    const [accessToken, setAccessToken] = useState(null)

    const [commentInput, setCommentInput] = useState('')
    const [starRating, setStarRating] = useState(3)
    const [commentStatus, setCommentStatus] = useState(false)
    const [allComments, setAllComments] = useState([])
    const [reviewed, setReviewed] = useState(false)


    const commentsRenderer = () => {
        return map(reverse(allComments), (comment, key) => {
            return <SingleComment comment={comment} key={key} />
        })
    }

    const sendComment = () => {
        if (!accessToken) {
            Alert.alert('Error. You are not authorized')
            setCommentStatus(false)
            setCommentInput('')
            return true
        }

        const data = {
            commentText: commentInput,
            id: placeId,
            rating: starRating ,

            // addings
            User: {
                nickName: "Vladimir Shabanov",
                picture: 'https://lh3.googleusercontent.com/ogw/ADGmqu_Bnl1o02YdaFIAHPNGUjOTgEz-f4w95KXeLDSL=s192-c-mo',
            },

        }

        // console.log(allComments[0])
        setAllComments(concat(allComments, data))
        setReviewed(true)

        // axios.post('https://diplom-backend.herokuapp.com/api/places/addComment', { data }, {
        //     headers: {
        //         // Authorization: `Bearer 6lPSd09bP45KuLqRXUJ6-P0TZfJSPSs1`
        //         Authorization: `Bearer ${accessToken}`
        //     }
        // })
        //     .then(() => {
        //         Alert.alert('Success')
        //     })
        //     .catch(error => {
        //         Alert.alert('Error', error.message)
        //     })
    }

    const commentPress = () => {

        // auth0.webAuth
        // .authorize({})
        // .then(credentials => {
        //     if (credentials.accessToken) {
        //         setCommentStatus(true)
        //         setAccessToken(credentials.accessToken)
        //     }
        //     else {
        //         Alert.alert('Error. You are not authorized')
        //     }
        // })
        // .catch((error) => {
        //     Alert.alert('Error', error)
        // })
        AsyncStorage.getItem('accessToken')
        .then((jsonAccessToken) => {
            const token = JSON.parse(jsonAccessToken)
            if (token) {
                setCommentStatus(true)
                setAccessToken(token)
            }
            else {
                Alert.alert('You are not authorized')
            }
        })
        .catch((error) => {
            Alert.alert('Error', error)
        })
    }

    useEffect(() => {
        axios.get(`https://diplom-backend.herokuapp.com/api/places/getPlaceComments?PlaceId=${placeId}`)
            .then((response) => {
                setAllComments(response.data.commentsVal)
                setReviewed(response.data.alreadyRewiew)
            })
            .catch((error) => {
                console.log('get comments error', error)
            })
    }, [])

    return (
        <View>
            <View style={{marginBottom: 20}}>
                {commentStatus && !reviewed && (
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                            <TextInput 
                                placeholder='Type comment here'
                                multiline
                                autoFocus
                                value={commentInput}
                                style={{
                                    flex: 25, 
                                    borderColor: 'lightgrey', 
                                    borderWidth: 1, 
                                    borderRadius: 5, 
                                    borderStyle: 'solid',
                                    paddingLeft: 10,
                                }}
                                onChangeText={(text) => {
                                    setCommentInput(text)
                                }}
                            />
                            <View style={{flex: 1}} />
                            <TouchableOpacity 
                                style={{...buttonStyle, flex: 5}}
                                onPress={sendComment}
                            >
                                <Text style={textStyle}>Send</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Rating
                                ratingCount={5}
                                imageSize={20}
                                ratingColor={'#B471EA'}
                                ratingBackgroundColor={'lightgrey'}
                                type='custom'
                                ratingImage={star}
                                onFinishRating={rating => setStarRating(rating)}
                            />
                            <Button 
                                title='Cancel'
                                onPress={() => setCommentStatus(false)}
                            />
                        </View>
                    </View>
                )}
                {!commentStatus && (
                    <TouchableOpacity 
                        style={buttonStyle}
                        onPress={commentPress}
                    >
                        <Text style={textStyle}>Comment</Text>
                    </TouchableOpacity>
                )}
            </View>
            {commentsRenderer()}
        </View>
    )
}

export default Comments