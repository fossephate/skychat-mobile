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


// import app id and client id from .env
// const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
// const PRIVY_APP_CLIENT_ID = process.env.PRIVY_APP_CLIENT_ID;
const PRIVY_APP_ID = "cm79od4vc01jm12i1iwdgzfa5"
const PRIVY_APP_CLIENT_ID = "client-WY5gyNCEn9UM3D1Pxu1qLoDDLLyHTvMN1Fdft7hQkJenQ"

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

  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

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
    if (loaded) {
      SplashScreen.hideAsync()
      router.replace("/welcome")
    }
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
