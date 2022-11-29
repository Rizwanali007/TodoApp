import firebase from './firebase'
import auth from '@react-native-firebase/auth'

export const SignUpUser = async (email, Password) => {
    console.log("Email,Password", Password, email);

    try {
        return (await firebase).auth().createUserWithEmailAndPassword(email, Password);
    } catch (error) {
        console.log("NNNNNN", error);

        return error;
    }
}
