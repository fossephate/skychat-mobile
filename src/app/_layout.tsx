// app/_layout.tsx
import React, { useEffect, useState } from "react"
import { router, Slot, SplashScreen, Stack } from "expo-router"
import { useInitialRootStore, useStores } from "src/models"
import { PrivyProvider, usePrivy } from '@privy-io/expo';
import { initI18n } from "@/i18n";
import { customFontsToLoad } from "@/theme";
import { loadDateFnsLocale } from "@/utils/formatDate";
import { useThemeProvider } from "@/utils/useAppTheme";
import { useFonts } from "expo-font";
import { OAuthSession, ReactNativeOAuthClient } from "@aquareum/atproto-oauth-client-react-native"
import { AuthProvider } from '@/contexts/auth'

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "src/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  // Wait for stores to load and render our layout inside of it so we have access
  const { rehydrated } = useInitialRootStore()

  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  const { authenticationStore } = useStores()

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])


  const loaded = fontsLoaded && isI18nInitialized && rehydrated

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    (async () => {
      if (loaded) {
        SplashScreen.hideAsync()

        let client = new ReactNativeOAuthClient({
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

        console.log("initializing client");
        authenticationStore.setClient(client)

        const result = await client.init();
        console.log("client init results:", result);
        if (result) {
          const { session } = result
          if ('state' in result && result.state != null) {
            console.log(
              `${session.sub} was successfully authenticated (state: ${result.state})`,
            )
          } else {
            console.log(`${session.sub} was restored (last active session)`)
          }
          authenticationStore.setDidAuthenticate(true)
          router.replace("/chats")
        } else {
          router.replace("/welcome")
        }
      }
    })()
  }, [loaded])

  if (!loaded) {
    return null
  }


  // if (isReady) {
  //   if (!user) {
  // router.replace("/welcome")
  //   } else {
  //     router.replace("/chats")
  //   }
  // }

  // return (
  //   <PrivyProvider
  //     appId={PRIVY_APP_ID!}
  //     clientId={PRIVY_APP_CLIENT_ID!}
  //   >
  //     <Stack screenOptions={{ headerShown: false }} />
  //   </PrivyProvider>
  // )

  // return <Slot />
  return <Stack screenOptions={{ headerShown: false }} />
}
