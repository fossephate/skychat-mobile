import React, { useEffect, useState } from "react"
import { Redirect, router, Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router"
import { observer } from "mobx-react-lite"
import { useInitialRootStore, useStores } from "src/models"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "src/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"

export default observer(function Layout() {

  // useEffect(() => {
  //   // if (isReady) {
  //   //   SplashScreen.hideAsync()
  //   //   if (!user) {
  //   //     router.replace("/welcome")
  //   //   } else {
  //   //     router.replace("/chats")
  //   //   }
  //   // }
  //   SplashScreen.hideAsync()
  //   router.replace("/welcome")
  // }, [])

  return <Stack screenOptions={{ headerShown: false }} />
})
