import React, { useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  FlatList,
  Image,
  ImageStyle,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native"
import { Screen, Text, ListItem } from "src/components"
import { colors, spacing } from "src/theme"

interface User {
  id: string
  name: string
  avatar?: string
  online: boolean
  verified?: boolean
}

interface Chat {
  id: string
  members: User[]
  name?: string
  lastMessage: {
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
  verified: true,
}

const UserSelectDrawer = ({ isVisible, onClose, users }: {
  isVisible: boolean
  onClose: () => void
  users: User[]
}) => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())

  const toggleUser = (userId: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedUsers(newSelected)
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={$modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={$drawerContainer}>
          <TouchableOpacity activeOpacity={1}>
            <View style={$drawerContent}>
              <View style={$drawerHeader}>
                <Text style={$drawerTitle}>New Chat</Text>
                <TouchableOpacity
                  style={$createButton}
                  onPress={() => {
                    console.log("Selected users:", Array.from(selectedUsers))
                    onClose()
                  }}
                >
                  <Text style={$createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={$drawerScroll}>
                {users.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    style={$userSelectItem}
                    onPress={() => toggleUser(user.id)}
                  >
                    <View style={$checkboxContainer}>
                      <View style={[
                        $checkbox,
                        selectedUsers.has(user.id) && $checkboxSelected
                      ]}>
                        {selectedUsers.has(user.id) && (
                          <Text style={$checkmark}>✓</Text>
                        )}
                      </View>
                    </View>
                    <Image source={{ uri: user.avatar }} style={$selectAvatar} />
                    <View style={$userInfo}>
                      <Text style={$userName}>{user.name}</Text>
                      {user.verified && <Text style={$verifiedBadgeSmall}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
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

// Generate realistic chats data
const generateChats = (): Chat[] => {
  const users: User[] = [
    {
      id: "u1",
      name: "Sarah Mitchell",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      online: true,
      verified: true,
    },
    {
      id: "u2",
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?u=alex",
      online: false,
      verified: true,
    },
    ...Array(8).fill(null).map((_, index) => ({
      id: `u${index + 3}`,
      name: `User ${index + 3}`,
      avatar: `https://i.pravatar.cc/150?u=user${index + 3}`,
      online: Math.random() > 0.7,
      verified: Math.random() > 0.8,
    })),
  ]

  const chats: Chat[] = [
    {
      id: "dm1",
      members: [SELF_USER, users[0]],
      lastMessage: {
        text: "Looking forward to our meeting tomorrow! 📅",
        sender: users[0],
        timestamp: "2m",
        read: false,
      },
      unreadCount: 2,
      pinned: true,
    },
    {
      id: "g1",
      name: "Design Team",
      members: [SELF_USER, ...users.slice(0, 4)],
      lastMessage: {
        text: "Just shared the latest mockups for review",
        sender: users[1],
        timestamp: "15m",
        read: true,
      },
      unreadCount: 0,
      pinned: true,
    },
    ...Array(10).fill(null).map((_, index) => {
      const chatMembers = [SELF_USER];
      const numUsers = Math.floor(Math.random() * 5) + 1
      chatMembers.push(...users.slice(0, numUsers))

      const lastMessageSender = chatMembers[Math.floor(Math.random() * chatMembers.length)]

      return {
        id: `chat-${index}`,
        name: `Group ${index}`,
        members: chatMembers,
        lastMessage: {
          text: `Message ${index}`,
          sender: lastMessageSender,
          timestamp: `${Math.floor(Math.random() * 59)}m`,
          read: Math.random() > 0.3,
        },
        unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
        muted: Math.random() > 0.8,
      }
    }),
  ]

  return chats.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })
}

// Generate dummy users
const generateUsers = (): User[] => [
  {
    id: "u1",
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/150?u=alice",
    online: true,
    verified: false,
  },
  {
    id: "u2",
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/150?u=bob",
    online: false,
    verified: false,
  },
  ...Array(20).fill(null).map((_, index) => ({
    id: `u${index + 3}`,
    name: `User ${index + 3}`,
    avatar: `https://i.pravatar.cc/150?u=user${index + 3}`,
    online: Math.random() > 0.7,
    verified: Math.random() > 0.8,
  })),
]

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats] = useState(generateChats())
  const [users] = useState(generateUsers())
  const [composeDrawerOpen, setComposeDrawerOpen] = useState(false)

  const renderChatAvatar = (chat: Chat) => {
    const isDM = chat.members.length === 2
    const otherMember = chat.members.find(member => member.id !== SELF_USER.id)

    if (isDM && otherMember) {
      return (
        <View style={$avatarContainer}>
          <Image source={{ uri: otherMember.avatar }} style={$avatar} />
          {otherMember.online && <View style={$onlineBadge} />}
          {otherMember.verified && <View style={$verifiedBadge}>✓</View>}
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

  const renderChat = ({ item: chat }: { item: Chat }) => (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={[$chatCard, chat.pinned && $pinnedChat]}>
        <ListItem
          LeftComponent={renderChatAvatar(chat)}
          text={getChatName(chat, SELF_USER.id)}
          textStyle={[
            $chatName,
            !chat.lastMessage.read && $unreadChatName,
          ]}
          secondaryText={
            <View style={$messageContainer}>
              <Text
                style={[
                  $messageText,
                  !chat.lastMessage.read && $unreadMessageText,
                  chat.muted && $mutedText,
                ]}
                numberOfLines={1}
              >
                {chat.members.length > 2 && (
                  <Text style={$senderName}>{chat.lastMessage.sender.name}: </Text>
                )}
                {chat.lastMessage.text}
              </Text>
            </View>
          }
          RightComponent={
            <View style={$rightContainer}>
              <Text style={[
                $timestamp,
                !chat.lastMessage.read && $unreadTimestamp,
                chat.muted && $mutedText,
              ]}>
                {chat.lastMessage.timestamp}
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
    </TouchableOpacity>
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={$header}>
        <Text preset="heading" style={$headerText}>
          Messages
        </Text>
        <TouchableOpacity
          style={$composeButton}
          onPress={() => setComposeDrawerOpen(true)}
        >
          <Text style={$composeIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={$searchContainer}>
        <TextInput
          style={$searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.text}
        />
      </View>

      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={$listContent}
        showsVerticalScrollIndicator={false}
      />

      <UserSelectDrawer
        isVisible={composeDrawerOpen}
        onClose={() => setComposeDrawerOpen(false)}
        users={users.filter(user => user.id !== SELF_USER.id)}
      />
    </Screen>
  )
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
  color: colors.dim,
  flex: 1,
}

const $unreadMessageText: TextStyle = {
  color: colors.text,
  fontWeight: "500",
}

const $mutedText: TextStyle = {
  color: colors.dim,
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
  color: colors.dim,
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
  backgroundColor: colors.dim,
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