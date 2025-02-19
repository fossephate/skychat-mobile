import { TextInput, ViewStyle, TextStyle, Linking } from "react-native"
import { Button, Screen, Text, TextField } from "src/components"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useEffect, useState } from 'react'
import { openAuthSessionAsync } from 'expo-web-browser'
// let Crypto = require('react-native-quick-crypto')
import QuickCrypto from 'react-native-quick-crypto';
// import { ReactNativeOAuthClient } from "hacks/atproto-oauth-client-react-native/src"
import { ReactNativeOAuthClient } from "@aquareum/atproto-oauth-client-react-native"



export default observer(function Login(_props) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { authenticationStore } = useStores()

  // Set up deep link handling when component mounts
  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle deep link when app is opened from background
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleDeepLink = async (event: { url: string }) => {
    console.log("handleDeepLink", event)
    if (!event.url) return;
    const url = new URL(event.url);
    const path = url.pathname;
    const queryParams = Object.fromEntries(url.searchParams);
    const client = authenticationStore.client

    // if (!client) {
    //   // don't redirect if client is not initialized:
    //   router.replace("/login");
    //   return;
    // }

    // console.log('Received deep link path:', path);
    // console.log('Query params:', queryParams);

    // if (queryParams.code && queryParams.state && queryParams.iss) {
    //   console.log("GOT CODE, STATE, AND ISS");

    //   // prevent any redirect from happening with expo router:



    //   // const { session, state } = await client.callback(test);

    //   // client.callback(test).then(res => {
    //   //   console.log("res", res)
    //   // })

    //   console.log("code", queryParams.code)
    //   console.log("state", queryParams.state)
    //   // console.log(`logged in as ${session.sub}`)

    //   // const redirectParams = `/?session=${queryParams.session}&state=${queryParams.state}`
    //   // console.log("redirectParams", redirectParams)

    //   // let queryParams2 =
    //   //   { "code": "cod-76113ba554588631b6e23079031e46e022b96a0ec4f6eae14cb597342260f877", "error": "Error: Unknown authorization session \"EzbDnn3OX-g8PF-IBk2EbA\"", "iss": "https://bsky.social", "state": "EzbDnn3OX-g8PF-IBk2EbA" };
    //   setTimeout(() => {
    //     console.log("queryParams", queryParams)
    //     router.replace({
    //       pathname: '/',
    //       params: {
    //         code: queryParams.code,
    //         state: queryParams.state,
    //         iss: queryParams.iss
    //       }
    //     });
    //   }, 1000)
    // }
  };

  const handleLogin = async () => {
    console.log("input", username)
    const client = authenticationStore.client


    // let queryParams2 =
    //   { "code": "cod-76113ba554588631b6e23079031e46e022b96a0ec4f6eae14cb597342260f877", "error": "Error: Unknown authorization session \"EzbDnn3OX-g8PF-IBk2EbA\"", "iss": "https://bsky.social", "state": "EzbDnn3OX-g8PF-IBk2EbA" };
    // router.push({
    //   pathname: '/',
    //   params: {
    //     code: queryParams2.code,
    //     state: queryParams2.state,
    //     iss: queryParams2.iss
    //   }
    // });

    if (!client) {
      setError("Client not initialized")
      setTimeout(() => setError(""), 3000)
      return
    }

    try {
      let oauthUrl = await client.authorize(username);
      console.log("oauthUrl", oauthUrl)

      const authRes = await openAuthSessionAsync(oauthUrl.toString())
    } catch (err) {
      console.error("Login error:", err)
      setError("Login failed")
      setTimeout(() => setError(""), 3000)
    }
  }

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
        onPress={handleLogin}
      />

      {error && (
        <Text
          tx="loginScreen:handleNotFound"
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