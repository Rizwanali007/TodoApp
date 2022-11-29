import firebase from '@react-native-firebase/app';


const firebaseConfig = {
    clientId: '364893175789-k940v2mjgptop5753f08pf79qj86mkrt.apps.googleusercontent.com',
    appId: '1:364893175789:android:a90a2b0b30eecf959ef1e4',
    apiKey: 'AIzaSyDMfgZ4-IUaDr8Yp0v7CebMkQNJ-sBtveQ',
    storageBucket: 'todoapp-aaa28.appspot.com',
    messagingSenderId: '364893175789',
    databaseURL: 'https://todoapp-aaa28-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'todoapp-aaa28',

    persistence: true,
};

export default firebase.initializeApp(firebaseConfig);
