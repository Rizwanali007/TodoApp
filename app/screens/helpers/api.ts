import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';



export const GetCurrentUserDataAPI = async () => {

    const UserData = auth().currentUser
    try {
        await AsyncStorage.setItem('@storage_user_id', UserData.uid)
        return UserData
    } catch (e) {
        // saving error
        console.log('>>> saving error : ', e);
    }

}
export const emptysUserData = async () => {
    try {
        await AsyncStorage.setItem('@storage_user_id', '')
    } catch (e) {
        // saving error
        console.log('>>> saving error : ', e);
    }

}


export const getUserId = async () => {

    try {
        const value = await AsyncStorage.getItem('@storage_user_id')
        if (value !== null) {
            // value previously stored
            console.log('>>> Read user value : ', value);

        }
        return value
    } catch (e) {
        // error reading value
        console.log('>>> error reading value : ', e);
    }
}

export const writeUserData = async (body) => {
    const value = await AsyncStorage.getItem('@storage_user_id')
    var userObject = await firestore().collection('Users').doc(value).get();
    let user = userObject._data === undefined ? {} : userObject._data
    console.log('>>> user user user', user);
    if (body.name && body.name !== '') {
        user.name = body.name
    }
    if (body.firstName && body.firstName !== '') {
        user.firstName = body.firstName
    }
    if (body.lastName && body.lastName !== '') {
        user.lastName = body.lastName
    }
    if (body.userMobile && body.userMobile !== '') {
        user.userMobile = body.userMobile
    }
    if (body.address && body.address !== '') {
        user.address = body.address
    }


    if (body.email && body.email !== '') {
        user.email = body.email
    }
    if (body.gender && body.gender !== '') {
        user.gender = body.gender
    }
    if (body.profileUrl) {

        user.profileUrl = body.profileUrl
    }
    if (body.type) {
        user.type = body.type
    }




    firestore()
        .collection('Users')
        .doc(value)
        .set(user)
        .then(() => {
            console.log('User added!');
        });
}

export const getUserData = async () => {

    const value = await AsyncStorage.getItem('@storage_user_id')
    var user = await firestore().collection('Users').doc(value).get();
    return (user)
}





export const writeRideOrder = async (body) => {
    console.log('>>> Come JHere 11');


    console.log('>>> Come JHere 22');

    firestore()
        .collection('OrdersRide')
        .doc(body.date)
        .set(body)
        .then(() => {
            console.log('User added! OrdersRide ');
        }).catch((err) => {
            console.log(">>> Error ", err);
        });

}