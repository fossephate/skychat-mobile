import { TextInput, ViewStyle, TextStyle } from "react-native"
import { Button, Screen, Text, TextField } from "src/components"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useLoginWithEmail } from '@privy-io/expo'
import { useEffect, useRef, useState } from 'react'
import { openAuthSessionAsync } from 'expo-web-browser'

import ReactNativeOAuthClient  from '@aquareum/atproto-oauth-client-react-native';

export default observer(function Login(_props) {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      router.replace("/")
    },
  })
  const codeInput = useRef<TextInput>(null)

  const handleLogin = async () => {
    console.log("input", username)

    // POST /login with our username:
    let loginUrl = "https://skychat.fosse.co/login";
    let handleRes = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle: username }),
    });
    // console.log("Response1:", res);

    let oauthUrl = handleRes.url;

    if (oauthUrl === loginUrl) {
      setError("Handle not found")
      return;
    }

    const authRes = await openAuthSessionAsync(oauthUrl)

    ReactNativeOAuthClient.

    if (authRes.type === 'success') {
      // const params = new URLSearchParams(authRes.url.split('?')[1])
      // // const { session, state } = await oauthClient.callback(params)
      // // console.log(`logged in as ${session.sub}`)
      // console.log(params);
    }
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
        tx="loginScreen:loginButton"
        style={$tapButton}
        preset="reversed"
        disabled={state.status === 'sending-code'}
        onPress={handleLogin}
      />

      {error && (
        <Text
          tx="loginScreen:handleNotFound"
          style={$hint}
        />
      )}




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