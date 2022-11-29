import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View, Image, Text } from "react-native"
import { Button, Icon, Screen, TextField } from "../components"
import { useStores } from "../models"
import { showToast, validateUserEmail } from '../screens/helpers/utils'
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { SetToken } from "./asyncStorage"
import auth from '@react-native-firebase/auth'

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }


export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const [Password, setPassword] = useState('')
  const [eMail, setEMail] = useState('')

  const loginEmailAndPassword = async () => {

    await auth().signInWithEmailAndPassword(eMail.trim(), Password)
      .then(async (user) => {
        console.log('>>>  user ', user);
        await SetToken(user.user.uid)
        console.log('>>>  user.uid ', user.user.uid);
        navigation.navigate('HomeScreen')
      })
      .catch(error => {
        console.log('>>> error login ', error);
        if (error.code === 'auth/user-not-found') {
          showToast('That email address does not exists!')
        }
        else if (error.code === 'auth/wrong-password') {
          showToast('Wrong Password!')
        }
        else if (error.code === 'auth/network-request-failed') {
          showToast('Network Error')
        }

      });
  }

  const btnActionSignIn = () => {
    console.log('>>> Sign In click ', eMail);
    if (eMail === '') {
      showToast('Email is required!')
    }
    else if (!validateUserEmail(eMail.trim())) {
      showToast('Enter Valid Email!')
    }
    else if (Password === '') {
      showToast('Password is required!')
    }
    else if (Password.length < 8) {
      showToast('Password should be at least 8 characters ')
    }
    else {
      loginEmailAndPassword()
      setEMail('')
      setPassword('')
    }
  }


  function goSignUp() {
    navigation.navigate('SignUp')
  }


  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginRight: 0 }}>LET'S TAKE IT</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginLeft: 70 }}>  FROM THE TOP </Text>
      </View>


      <TextField
        value={eMail}
        onChangeText={setEMail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        // labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
      />

      <TextField
        // ref={authPasswordInput}
        value={Password}
        onChangeText={setPassword}
        containerStyle={$textField1}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        placeholderTx="loginScreen.passwordFieldPlaceholder"

      />
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={btnActionSignIn}
      />
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignUp"
        style={$tapButton1}
        preset="reversed"
        onPress={goSignUp}
      />
      <View style={{ alignItems: 'center', marginTop: 110 }}><Text style={{ color: 'white' }}>Need Help?</Text></View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: 'black',
  flex: 1,
  alignItems: 'center',
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}


const $textField: ViewStyle = {
  marginTop: 50,
  // borderRadius: 25,
  width: '92%',
  height: 25,
  marginBottom: spacing.large,
}

const $textField1: ViewStyle = {
  marginTop: 40,
  // borderRadius: 25,
  width: '92%',
  height: 40,
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: 70,
  width: '92%',
  height: 35,
  borderRadius: 30,
  backgroundColor: 'red'//spacing.extraSmall,
}

const $tapButton1: ViewStyle = {
  marginTop: 30,
  width: '92%',
  height: 35,
  borderRadius: 30,
  borderWidth: 1,
  backgroundColor: 'black',//spacing.extraSmall,
  borderColor: 'red'
}