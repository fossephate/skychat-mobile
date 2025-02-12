import { router } from "expo-router";
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors, spacing } from "@/theme";
import { ListItem } from "src/components/ListItem";
import { Text } from "src/components";

export interface User {
  id: string
  name: string
  avatar?: string
  online: boolean
}

export interface Chat {
  id: string
  members: User[]
  name?: string
  lastMessage?: {
    text: string
    sender: User
    timestamp: string
    read: boolean
  }
  unreadCount: number
  pinned?: boolean
  muted?: boolean
}

const SELF_USER: User = {
  id: "self",
  name: "You",
  avatar: "https://i.pravatar.cc/150?u=self",
  online: true,
}

// Helper to get chat name if not explicitly set
const getChatName = (chat: Chat, currentUserId: string): string => {
  if (chat.name) return chat.name

  const otherMembers = chat.members.filter(member => member.id !== currentUserId)
  if (chat.members.length === 2) {
    return otherMembers[0].name
  }
  return otherMembers.slice(0, 3).map(m => m.name).join(", ")
}

const renderChatAvatar = (chat: Chat) => {
  const isDM = chat.members.length === 2
  const otherMember = chat.members.find(member => member.id !== SELF_USER.id)

  if (isDM && otherMember) {
    return (
      <View style={$avatarContainer}>
        <Image source={{ uri: otherMember.avatar }} style={$avatar} />
        {otherMember.online && <View style={$onlineBadge} />}
      </View>
    )
  } else {
    return (
      <View style={$avatarContainer}>
        <View style={[$avatar, $groupAvatar]}>
          <Text style={$groupAvatarText}>
            {chat.name?.[0]?.toUpperCase() || getChatName(chat, SELF_USER.id)[0]}
          </Text>
        </View>
        {!isDM && (
          <View style={$memberCount}>
            <Text style={$memberCountText}>{chat.members.length}</Text>
          </View>
        )}
      </View>
    )
  }
}

// const lastMessage = (chat: Chat) => {
//   {chat.lastMessage && (
//     <View style={$messageContainer}>
//       <Text
//         style={[
//           $messageText,
//           !chat.lastMessage.read && $unreadMessageText,
//           chat.muted && $mutedText,
//         ]}
//         numberOfLines={1}
//       >
//         {chat.members.length > 2 && (
//           <Text style={$senderName}>{chat.lastMessage.sender.name}: </Text>
//         )}
//         {chat.lastMessage.text}
//       </Text>
//     </View>
//   )}
// }

export const renderChatItem = ({ item: chat }: { item: Chat }) => (
  <View style={[$chatCard, chat.pinned && $pinnedChat]}>
    <ListItem
      LeftComponent={renderChatAvatar(chat)}
      text={getChatName(chat, SELF_USER.id)}
      textStyle={[
        $chatName,
        !chat.lastMessage?.read && $unreadChatName,
      ]}
      onPress={() => {
        console.log("chatName", chat.id)
        const chatName = getChatName(chat, SELF_USER.id)
        router.push(`/chats/${chat.id}`)
      }}
      RightComponent={
        <View style={$rightContainer}>
          <Text style={[
            $timestamp,
            !chat.lastMessage.read && $unreadTimestamp,
            chat.muted && $mutedText,
          ]}>
            {chat.lastMessage?.timestamp}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={[$unreadBadge, chat.muted && $mutedBadge]}>
              <Text style={$unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
          {chat.muted && <Text style={$mutedIcon}>🔇</Text>}
          {chat.pinned && <Text style={$pinnedIcon}>📌</Text>}
        </View>
      }
      style={$listItem}
    />
  </View>
);


const $onlineBadge: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: "#4CAF50",
  borderWidth: 2,
  borderColor: colors.background,
}

const $verifiedBadge: ViewStyle = {
  position: "absolute",
  bottom: -2,
  right: -2,
  backgroundColor: colors.palette.primary500,
  borderRadius: 10,
  width: 20,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.background,
}

// Styles
const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $header: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $headerText: TextStyle = {
  fontSize: 32,
}

const $composeButton: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.primary100,
  justifyContent: "center",
  alignItems: "center",
}

const $composeIcon: TextStyle = {
  fontSize: 20,
}

const $searchContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.md,
}

const $searchInput: TextStyle = {
  height: 40,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 20,
  paddingHorizontal: spacing.md,
  fontSize: 16,
}

const $listContent: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.lg,
}

const $chatCard: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  marginBottom: spacing.sm,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
}

const $pinnedChat: ViewStyle = {
  borderLeftWidth: 3,
  borderLeftColor: colors.palette.primary500,
}

const $listItem: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
}

const $avatarContainer: ViewStyle = {
  position: "relative",
  marginRight: spacing.sm,
}

const $avatar: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
}

const $groupAvatar: ViewStyle = {
  backgroundColor: colors.palette.secondary300,
  justifyContent: "center",
  alignItems: "center",
}

const $groupAvatarText: TextStyle = {
  color: colors.background,
  fontSize: 20,
  fontWeight: "bold",
}



const $memberCount: ViewStyle = {
  position: "absolute",
  bottom: -2,
  right: -2,
  backgroundColor: colors.palette.secondary500,
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.background,
}

const $memberCountText: TextStyle = {
  color: colors.background,
  fontSize: 11,
  fontWeight: "bold",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
}

const $chatName: TextStyle = {
  fontSize: 16,
  marginBottom: 2,
}

const $unreadChatName: TextStyle = {
  fontWeight: "bold",
}

const $messageContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $messageText: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral600,
  flex: 1,
}

const $unreadMessageText: TextStyle = {
  color: colors.text,
  fontWeight: "500",
}

const $mutedText: TextStyle = {
  color: colors.palette.neutral600,
  opacity: 0.6,
}

const $senderName: TextStyle = {
  fontWeight: "bold",
}

const $rightContainer: ViewStyle = {
  alignItems: "flex-end",
}

const $timestamp: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral600,
  marginBottom: spacing.xs,
}

const $unreadTimestamp: TextStyle = {
  color: colors.palette.primary500,
  fontWeight: "500",
}

const $unreadBadge: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderRadius: 12,
  minWidth: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 4,
}

const $mutedBadge: ViewStyle = {
  backgroundColor: colors.palette.neutral600,
  opacity: 0.6,
}

const $unreadText: TextStyle = {
  color: colors.background,
  fontSize: 13,
  fontWeight: "bold",
}

const $mutedIcon: TextStyle = {
  fontSize: 12,
  marginTop: spacing.xs,
}

const $pinnedIcon: TextStyle = {
  fontSize: 12,
  marginTop: spacing.xs,
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "flex-end",
}

const $drawerContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  maxHeight: "80%",
}

const $drawerContent: ViewStyle = {
  padding: spacing.md,
}

const $drawerHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral200,
}

const $drawerTitle: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
}

const $createButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  borderRadius: 16,
}

const $createButtonText: TextStyle = {
  color: colors.background,
  fontWeight: "bold",
}

const $userList: ViewStyle = {
  paddingTop: spacing.sm,
}

const $userSelectItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
}

const $checkboxContainer: ViewStyle = {
  marginRight: spacing.sm,
}

const $checkbox: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: colors.palette.neutral400,
  justifyContent: "center",
  alignItems: "center",
}

const $checkboxSelected: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderColor: colors.palette.primary500,
}

const $checkmark: TextStyle = {
  color: colors.background,
  fontSize: 14,
  fontWeight: "bold",
}

const $selectAvatar: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: spacing.sm,
}

const $userInfo: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
}

const $userName: TextStyle = {
  fontSize: 16,
  marginRight: spacing.xs,
}

const $verifiedBadgeSmall: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 14,
}

const $drawerScroll: ViewStyle = {
  maxHeight: 400,
}