// app/_layout.tsx
import React from "react"
import { Slot, SplashScreen } from "expo-router"
import { useInitialRootStore } from "src/models"
import { PrivyProvider } from '@privy-io/expo';
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
  if (!rehydrated) {
    return null
  }

  // return (
  //   <PrivyProvider
  //     appId={PRIVY_APP_ID!}
  //     clientId={PRIVY_APP_CLIENT_ID!}
  //   >
  //     <Slot />
  //   </PrivyProvider>
  // )

  return <Slot />
}
