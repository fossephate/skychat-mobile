import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "src/components"


export default observer(function SettingsScreen() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="settings" />
    </Screen>
  )

})

const $root: ViewStyle = {
  flex: 1,
}
