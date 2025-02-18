import React, { useEffect, useState } from "react"
import { Redirect, SplashScreen, Stack } from "expo-router"
import { observer } from "mobx-react-lite"
import { useInitialRootStore, useStores } from "src/models"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "src/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"

export default observer(function Layout() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
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
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  // if (!isAuthenticated) {
    return <Redirect href="/login" />
  // }

  // return (
  //   <PrivyProvider
  //     appId={PRIVY_APP_ID!}
  //     clientId={PRIVY_APP_CLIENT_ID!}
  //   >
  //     <Stack />
  //   </PrivyProvider>
  // );



  return <Stack screenOptions={{ headerShown: false }} />
})
