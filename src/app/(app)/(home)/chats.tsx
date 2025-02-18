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
import { useRouter } from "expo-router"
import { router } from "expo-router"
import { Chat, renderChatItem, User } from "src/components/Chat/ChatItem"


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



// Generate realistic chats data
const generateChats = (): Chat[] => {
  const users = generateUsers()

  const group_names = ["Design Team", "Marketing Team", "Engineering Team", "Product Team", "Sales Team", "Support Team", "Finance Team", "HR Team", "Legal Team", "IT Team"]

  const chats: Chat[] = [
    {
      id: "dm1",
      members: [SELF_USER, users[1]],
      lastMessage: {
        text: "Looking forward to our meeting tomorrow! 📅",
        sender: users[1],
        timestamp: "2m",
        read: false,
      },
      unreadCount: 0,
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
    ...Array(20).fill(null).map((_, index) => {
      const chatMembers = [SELF_USER];
      const numUsers = Math.floor(Math.random() * 5) + 1
      // get a random selection of users:
      const randomUsers = users.sort(() => Math.random() - 0.5).slice(0, numUsers)
      chatMembers.push(...randomUsers)

      const lastMessageSender = chatMembers[Math.floor(Math.random() * chatMembers.length)]

      const group_name = numUsers == 2 ? group_names[index % group_names.length] : "";

      return {
        id: `chat-${index}`,
        name: group_name,
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
    avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
    online: true,
    verified: false,
  },
  {
    id: "u2",
    name: "Bob Johnson",
    avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
    online: false,
    verified: false,
  },
  ...Array(20).fill(null).map((_, index) => ({
    id: `u${index + 3}`,
    name: `User ${index + 3}`,
    avatar: `https://i.pravatar.cc/150?u=user${index + 3}${Math.random()}`,
    online: Math.random() > 0.7,
    verified: Math.random() > 0.8,
  })),
]

const SELF_USER: User = {
  id: "self",
  name: "You",
  avatar: "https://i.pravatar.cc/150?u=self",
  online: true,
}

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats] = useState(generateChats())
  const [users] = useState(generateUsers())
  const [composeDrawerOpen, setComposeDrawerOpen] = useState(false)
  const router = useRouter()





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
        renderItem={renderChatItem}
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