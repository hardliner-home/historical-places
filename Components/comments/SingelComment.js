import React from 'react'
import { View, Text, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import star from "../../assets/icons/details/star.png"
import userAvatarIcon from "../../assets/icons/library/png/user.png"

const SingleComment = ({comment}) => {

    const avatar = comment.User.picture ? { uri: comment.User.picture } : userAvatarIcon

    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Image 
                    style={{
                        width: 50, 
                        height: 50, 
                        borderRadius: 50,
                        marginRight: 15,
                        resizeMode: 'contain',
                        backgroundColor: 'lightgrey',
                    }}
                    source={avatar} 
                />
                <View style={{flexDirection: 'column'}}>
                    <Text 
                        style={{
                            fontSize: 18,
                            flexDirection: 'row', 
                            marginTop: 3,
                            marginBottom: 5,
                        }}
                    >
                        {comment.User.nickName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Rating
                            type='custom'
                            ratingImage={star}
                            readonly={true}
                            startingValue={comment.rating}
                            ratingCount={5}
                            imageSize={16}
                            ratingColor={'#B471EA'}
                            ratingBackgroundColor={'lightgrey'}
                        />
                    </View>
                </View>
            </View>
            <Text 
                style={{     
                    color: 'grey',                   
                    marginLeft: 65,
                    lineHeight: 18,
                }}
            >
                {comment.commentText}
            </Text>
            <View 
                style={{
                    marginBottom: 15,
                    marginTop: 15,
                    alignSelf: 'center', 
                    width: '80%', 
                    borderColor: '#293845', 
                    borderStyle: 'solid', 
                    borderWidth: 1
                }} 
            />
        </View>
    )
}

export default SingleComment