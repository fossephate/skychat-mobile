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
  const [email, setEmail] = useState('')
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      router.replace("/")
    },
  })
  const codeInput = useRef<TextInput>(null)

  const handleSendCode = async () => {
    console.log("input", email)
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
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
        onSubmitEditing={handleSendCode}
      />

      <Button
        testID="send-code-button"
        tx="loginScreen:sendCode"
        style={$tapButton}
        preset="reversed"
        disabled={state.status === 'sending-code'}
        onPress={handleSendCode}
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