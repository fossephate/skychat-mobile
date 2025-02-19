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

  console.log("index rendered!");
  console.log("authenticationStore.client", authenticationStore.client)



  useEffect(() => {
    (async () => {
      const client = authenticationStore.client;
      if (params.code && params.state && params.iss && client) {
        console.log("HAVE ALL THE THINGS")
        let urlParams = new URLSearchParams();
        urlParams.set("code", params.code as string)
        urlParams.set("state", params.state as string)
        urlParams.set("iss", params.iss as string)
        console.log("urlParams", urlParams)
        const { session, state } = await client.callback(urlParams)
        console.log(`logged in as ${session.sub}!`)
        router.replace("/chats")
      }
    })()
  }, [])



  return null;
})