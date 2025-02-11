import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "src/components"


export default observer(function ChatsScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="chats" />
    </Screen>
  )

})

const $root: ViewStyle = {
  flex: 1,
}
