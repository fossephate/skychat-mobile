import { TextInput, ViewStyle, TextStyle } from "react-native"
import { Button, Screen, Text, TextField } from "src/components"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useLoginWithEmail } from '@privy-io/expo'
import { useEffect, useRef, useState } from 'react'
import { openAuthSessionAsync } from 'expo-web-browser'

export default observer(function Login(_props) {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      router.replace("/")
    },
  })
  const codeInput = useRef<TextInput>(null)

  const handleLogin = async () => {
    console.log("input", username)

    // POST /login with our username:
    let res = await fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      body: JSON.stringify({ handle: username }),
    });
    console.log("Response:");
    console.log("Response:", await res.json())

    // console.log("Sending code to email:", email)
    // let res = await sendCode({ email })
    // console.log("Response:", res)
    // codeInput.current?.focus()
  }

  useEffect(() => {
    console.log("Login screen mounted")
    console.log("state", state)

    if (state.status === 'done') {
      router.replace("/chats")
    }
  }, [state])

  return (
    <Screen
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="login-heading"
        tx="loginScreen:logIn"
        preset="heading"
        style={$signIn}
      />

      <Text
        tx="loginScreen:enterDetails"
        preset="subheading"
        style={$enterDetails}
      />

      <TextField
        value={username}
        onChangeText={setUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        keyboardType="default"
        labelTx="loginScreen:usernameFieldLabel"
        placeholderTx="loginScreen:usernameFieldPlaceholder"
        onSubmitEditing={handleLogin}
      />

      <Button
        testID="send-code-button"
        tx="loginScreen:login"
        style={$tapButton}
        preset="reversed"
        disabled={state.status === 'sending-code'}
        onPress={handleLogin}
      />

      {/* {state.status === 'sending-code' && (
        <Text
          tx="loginScreen:sendingCode"
          style={$hint}
        />
      )} */}


      {/* {state.status === 'awaiting-code-input' && (
        <>
          <TextField
            ref={codeInput}
            value={code}
            onChangeText={setCode}
            containerStyle={$textField}
            autoCapitalize="none"
            autoCorrect={false}
            labelTx="loginScreen:codeFieldLabel"
            placeholderTx="loginScreen:codeFieldPlaceholder"
            onSubmitEditing={() => loginWithCode({ code })}
          />

          <Button
            testID="login-button"
            tx="loginScreen:tapToLogIn"
            style={$tapButton}
            preset="reversed"
            disabled={state.status !== 'awaiting-code-input'}
            onPress={() => loginWithCode({ code })}
          />
        </>
      )} */}

      {state.status === 'submitting-code' && (
        <Text
          tx="loginScreen:loggingIn"
          style={$hint}
        />
      )}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}