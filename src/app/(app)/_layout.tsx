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

export default observer(function Layout() {
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

  return <Stack screenOptions={{ headerShown: false }} />
})
