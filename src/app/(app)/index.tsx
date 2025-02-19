import { router, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite"
import { useStores } from "@/models";
import { useEffect } from "react";

export default observer(function LoadingScreen() {

  const { authenticationStore } = useStores();
  const params = useLocalSearchParams();

  console.log("params", params)

  // setTimeout(() => {
  //   router.replace("/login")
  // }, 3000);
  // const { session, state } = router.params;

  useEffect(() => {
    (async () => {
      const client = authenticationStore.client;
      if (params.code && params.state && params.iss && client) {
        let urlParams = new URLSearchParams();
        urlParams.set("code", params.code as string)
        urlParams.set("state", params.state as string)
        urlParams.set("iss", params.iss as string)
        const { session, state } = await client.callback(urlParams)
        console.log(`logged in as ${session.sub}!`)
        authenticationStore.setSession(session)
        router.replace("/chats")
      }
    })()
  }, [])



  return null;
})