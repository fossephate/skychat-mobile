import { TextInput, ViewStyle, TextStyle, Linking } from "react-native"
import { Button, Screen, Text, TextField } from "src/components"
import { router } from "expo-router"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import { colors, spacing } from "src/theme"
import { useEffect, useRef, useState } from 'react'
import { openAuthSessionAsync } from 'expo-web-browser'
// let Crypto = require('react-native-quick-crypto')
import QuickCrypto from 'react-native-quick-crypto';
// import { ReactNativeOAuthClient } from "hacks/atproto-oauth-client-react-native/src"
import { ReactNativeOAuthClient } from "@aquareum/atproto-oauth-client-react-native"



export default observer(function Login(_props) {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');


  // Set up deep link handling when component mounts
  useEffect(() => {
    // Handle deep links before navigation occurs
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event);
    });

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
    // Parse the URL - assuming format like skychat://callback?someData=value
    const url = new URL(event.url);
    const path = url.pathname;
    const queryParams = Object.fromEntries(url.searchParams);

    console.log('Received deep link path:', path);
    console.log('Query params:', queryParams);

    // // Handle the data based on your needs
    // if (path === 'callback') {
    //   // Handle successful login
    //   // You might have session data in queryParams
    // } else if (path === 'error') {
    //   // Handle error case
    //   setError('Login failed');
    // }

    // router.replace('/chats');
  };

  const handleLogin = async () => {
    console.log("input", username)

    // POST /login with our username:
    // let loginUrl = "https://skychat.fosse.co/login";
    let clientId = "https://skychat.fosse.co/client-metadata.json";
    // let handleRes = await fetch(loginUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ handle: username }),
    // });

    let oauthClient = new ReactNativeOAuthClient({
      clientMetadata: {
        "redirect_uris": [
          "https://skychat.fosse.co/oauth/callback"
        ],
        "response_types": [
          "code"
        ],
        "grant_types": [
          "authorization_code",
          "refresh_token"
        ],
        "scope": "atproto transition:generic",
        "token_endpoint_auth_method": "none",
        "application_type": "web",
        "client_id": "https://skychat.fosse.co/client-metadata.json",
        "client_name": "AT Protocol Express App",
        "client_uri": "https://skychat.fosse.co",
        "dpop_bound_access_tokens": true,
      },
      handleResolver: 'https://bsky.social'
    });

    // console.log("Crypto", QuickCrypto)
    // console.log(QuickCrypto.randomBytes(32).toString('hex'))

    console.log("clientId", clientId)

    // let oauthClient = await ReactNativeOAuthClient.load({ clientId: clientId, handleResolver: 'https://bsky.social' });
    console.log("oauthClient", oauthClient)

    let loginUrl2 = await oauthClient.authorize(username);
    console.log("loginUrl2", loginUrl2)


    // let oauthUrl = handleRes.url;

    // if (oauthUrl === loginUrl) {
    //   setError("Handle not found")
    //   setTimeout(() => {
    //     setError("")
    //   }, 3000)
    //   return;
    // }

    // const authRes = await openAuthSessionAsync(oauthUrl)

    // console.log("authRes", authRes)

    // if (authRes.type === 'success') {
    //   // const params = new URLSearchParams(authRes.url.split('?')[1])
    //   // // const { session, state } = await oauthClient.callback(params)
    //   // // console.log(`logged in as ${session.sub}`)
    //   // console.log(params);
    // }
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