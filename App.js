// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

registerRootComponent(IgniteApp)
export default IgniteApp

// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore'

// const firebaseConfig = {
//   clientId: '364893175789-k940v2mjgptop5753f08pf79qj86mkrt.apps.googleusercontent.com',
//   appId: '1:364893175789:android:a90a2b0b30eecf959ef1e4',
//   apiKey: 'AIzaSyDMfgZ4-IUaDr8Yp0v7CebMkQNJ-sBtveQ',
//   storageBucket: 'todoapp-aaa28.appspot.com',
//   messagingSenderId: '364893175789',
//   projectId: 'todoapp-aaa28',

//   persistence: true,
// };

// export const app = firebase.initializeApp(firebaseConfig);
// export const db = firestore.getFirestore()