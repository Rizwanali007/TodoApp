import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View, Image, Text } from "react-native"
import { Button, Icon, Screen, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { showToast, validateUserEmail } from '../screens/helpers/utils'
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { GetCurrentUserDataAPI, writeUserData } from '../screens/helpers/api'
import auth from '@react-native-firebase/auth'
import { SignUpUser } from "./utils/signUp"


interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }
// const welcomeLogo = require("../../assets/images/logo.png")
// const personLogo = require("../../assets/images/Vector.png")
// const keyLogo = require("../../assets/images/Vector1.png")

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
    const { navigation } = _props
    const [Password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [Email, setEmail] = useState('')
    // const auth1 = JSON.stringify(auth)
    // console.log("auth1", auth1)

    const signUpMailAndPassword = async () => {

        await SignUpUser(Email, Password)
            .then((res) => {
                console.log("res", res)
                console.log('User account created & signed in!');
                alert("Account created successfully.")
            })
            .catch(error => {
                console.log('error', error);

                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    showToast('That email address is already in use!')
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('error.code', error.code);

                    console.log('That email address is invalid!');
                }

                if (error.code === 'auth/network-request-failed') {
                    showToast('Network Error')
                }
                // console.error(error);
            });
    }


    const btnActionSignUp = () => {
        // if (userName === '') {
        //     showToast('Name is rsequired!')
        // }
        // else

        if (Email === '') {
            showToast('Email is required!')
        }
        else if (!validateUserEmail(Email)) {
            showToast('Enter Valid Email!')
        }

        else if (Password === '') {
            showToast('Password is required!')
        }
        else if (Password.length < 8) {
            showToast('Password should be at least 8 characters ')
        }
        else if (confirmPassword === '') {
            showToast('Confirm Password is required!')
        }
        else if (confirmPassword !== Password) {
            showToast('Password does not Matched!')
        }
        else {
            signUpMailAndPassword()
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }

        // navigation.navigate(Screeenames.AfterSignupScreen) 
    }

    function goNext() {
        navigation.navigate('Login')
    }

    return (
        <Screen
            preset="auto"
            contentContainerStyle={$screenContentContainer}
            safeAreaEdges={["top", "bottom"]}
        >
            {/* <Image style={{ height: 120, width: "100%", marginTop: 25 }} source={welcomeLogo} resizeMode="contain" /> */}
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', marginRight: 0 }}>Sign Up </Text>
            </View>
            {/* <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} /> */}
            {/* <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}
            {/* {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />} */}

            <TextField
                value={Email}
                onChangeText={setEmail}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                // labelTx="loginScreen.emailFieldLabel"
                placeholderTx="loginScreen.emailFieldPlaceholder"
            // helper={errors?.authEmail}
            // status={errors?.authEmail ? "error" : undefined}
            // onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            {/* <Image style={{ height: 20, width: "100%", marginTop: -35, marginRight: 290 }} source={personLogo} resizeMode="contain" /> */}

            <TextField
                // ref={authPasswordInput}
                value={Password}
                onChangeText={setPassword}
                containerStyle={$textField1}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                // secureTextEntry={isAuthPasswordHidden}
                // labelTx="loginScreen.passwordFieldLabel"
                placeholderTx="loginScreen.passwordFieldPlaceholder"
            // helper={errors?.authPassword}
            // status={errors?.authPassword ? "error" : undefined}
            // onSubmitEditing={login}
            // RightAccessory={PasswordRightAccessory}
            />
            {/* <Image style={{ height: 20, width: "100%", marginTop: -50, marginRight: 290 }} source={keyLogo} resizeMode="contain" /> */}
            <TextField
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                containerStyle={$textField2}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                // labelTx="loginScreen.emailFieldLabel"
                placeholderTx="loginScreen.passwordRepeatPlaceholder"
            // helper={errors?.authEmail}
            // status={errors?.authEmail ? "error" : undefined}
            // onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            {/* <Image style={{ height: 20, width: "100%", marginTop: -35, marginRight: 290 }} source={keyLogo} resizeMode="contain" /> */}

            <Button
                testID="login-button"
                tx="loginScreen.tapToSignUp"
                style={$tapButton}
                preset="reversed"
                onPress={btnActionSignUp}
            />
            <Button
                testID="login-button"
                tx="loginScreen.tapToSignIn"
                style={$tapButton1}
                preset="reversed"
                onPress={goNext}
            />
            <View style={{ alignItems: 'center', marginTop: 70 }}><Text style={{ color: 'white' }}>Need Help?</Text></View>
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

// const $enterDetails: TextStyle = {
//   marginBottom: spacing.large,
// }

// const $hint: TextStyle = {
//   color: colors.tint,
//   marginBottom: spacing.medium,
// }

const $textField: ViewStyle = {
    marginTop: 50,
    // borderRadius: 25,
    width: '92%',
    height: 25,
    marginBottom: spacing.large,

}

const $textField2: ViewStyle = {
    marginTop: 42,
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
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'black',//spacing.extraSmall,
    borderColor: 'red'
}

// @demo remove - file
