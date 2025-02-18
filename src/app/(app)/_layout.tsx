import React, { useEffect, useState } from "react"
import { Redirect, router, Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router"
import { observer } from "mobx-react-lite"
import { useInitialRootStore, useStores } from "src/models"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "src/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { usePrivy } from "@privy-io/expo"

// function AuthGuard() {
//   const segments = useSegments()
//   const router = useRouter()
//   const { user } = usePrivy()

//   useEffect(() => {

//     const inAuthGroup = segments[0] === "(auth)"

//     if (user && inAuthGroup) {
//       // Redirect away from auth group if user is logged in
//       router.replace("/")
//     } else if (!user && !inAuthGroup) {
//       // Redirect to login if user is not logged in and trying to access protected routes
//       router.replace("/login")
//     }
//   }, [user, ready, segments])

//   return <Slot />
// }

export default observer(function Layout() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
  // const { rehydrated } = useInitialRootStore()

  // const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  // const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  // const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  // const {
  //   authenticationStore: { isAuthenticated },
  // } = useStores()

  // useEffect(() => {
  //   initI18n()
  //     .then(() => setIsI18nInitialized(true))
  //     .then(() => loadDateFnsLocale())
  // }, [])

  // const loaded = fontsLoaded && isI18nInitialized && rehydrated

  // useEffect(() => {
  //   if (fontError) throw fontError
  // }, [fontError])

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  // if (!isAuthenticated) {
  //   return <Redirect href="/login" />
  // }

  // return (
  //   <PrivyProvider
  //     appId={PRIVY_APP_ID!}
  //     clientId={PRIVY_APP_CLIENT_ID!}
  //   >
  //     <Stack />
  //   </PrivyProvider>
  // );



  const { user, isReady } = usePrivy()

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
      if (!user) {
        router.replace("/welcome")
      } else {
        router.replace("/chats")
      }
    }
  }, [isReady, user])

  // if (isReady) {
  //   // if (!user) {
  //   //   return <Redirect href="/welcome" />
  //   // } else {
  //   //   // check if the current route is in the tabs
  //   //   // const segments = useSegments()
  //   //   // if (segments[0] === "(tabs)") {
  //   //   //   return <Redirect href="/chats" />
  //   //   // }
  //   // }

  //   // console log the current route:
  //   console.log("current route", router.path)
  // }

  // if (!user) {
  //   return <Redirect href="/login" />
  // }

  return <Stack screenOptions={{ headerShown: false }} />
  // return <Slot />
})
