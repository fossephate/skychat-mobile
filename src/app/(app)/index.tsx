import { router, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite"
import { useStores } from "@/models";
import { useEffect } from "react";

export default observer(function LoadingScreen() {

  const { authenticationStore } = useStores();

  // setTimeout(() => {
  //   router.replace("/login")
  // }, 3000);

  // const { session, state } = router.params;


  useEffect(() => {
    (async () => {
      const client = authenticationStore.client;
      const params = useLocalSearchParams();
      console.log("params", params)
      if (params.code && params.state && params.iss && client) {

        const { session, state } = await client.callback(new URLSearchParams({ ...params } as any))
        console.log("session", session)
        console.log("state", state)
        router.replace("/chats")
      }
    })()
  }, [])



  return null;
})