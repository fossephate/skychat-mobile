import { observer } from "mobx-react-lite"
import React from "react"
import { View, ViewStyle, FlatList, KeyboardAvoidingView, Platform } from "react-native"
import { Screen, Text } from "@/components"
import { colors, spacing } from "@/theme"
import { useLocalSearchParams } from "expo-router"
import { Message } from "src/components/Convo/MessageItem"
import { MessageInput } from "src/components/Chat/MessageInput"
import * as ImagePicker from "expo-image-picker"

const mockMessages = [
  {
    id: "1",
    text: "Hey there! How are you?",
    sender: "them",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    text: "I'm doing great, thanks for asking!",
    sender: "me",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    text: "What's up?",
    sender: "them",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
]

export default observer(function ChatScreen() {
  const { groupId } = useLocalSearchParams()

  const handleSendMessage = (text: string, attachments?: ImagePicker.ImagePickerAsset[]) => {
    console.log("Sending message:", text, attachments)
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={$keyboardAvoidingView}
      >
        <View style={$headerContainer}>
          <Text preset="heading" tx="chatScreen:title" txOptions={{ name: groupId }} />
        </View>

        <FlatList
          data={mockMessages.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message message={item} />}
          contentContainerStyle={$messageList}
          inverted
        />

        <MessageInput onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $keyboardAvoidingView: ViewStyle = {
  flex: 1,
}

const $headerContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
}

const $messageList: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
}