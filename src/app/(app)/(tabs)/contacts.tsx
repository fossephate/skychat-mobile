import React, { useState } from "react"
import { View, ViewStyle, TextStyle, FlatList, Image, ImageStyle, TextInput, TouchableOpacity } from "react-native"
import { Screen, Text } from "src/components"
import { colors, spacing } from "src/theme"

interface User {
  id: string
  name: string
  avatar: string
  status?: string
  verified?: boolean
  online?: boolean
}

const generateUsers = (): User[] => [
  {
    id: "elena",
    name: "Elena Zhang",
    avatar: "https://i.pravatar.cc/150?u=elena",
    status: "Building something new 🚀",
    online: true,
    verified: true,
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    status: "Designer & Developer",
    online: true,
    verified: true,
  },
  {
    id: "sophia",
    name: "Sophia Patel",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    status: "Art Director @Studio",
    online: false,
    verified: true,
  },
  {
    id: "lucas",
    name: "Lucas Kim",
    avatar: "https://i.pravatar.cc/150?u=lucas",
    status: "Just exploring 🌎",
    online: false,
    verified: true,
  },
  {
    id: "nadia",
    name: "Nadia Rodriguez",
    avatar: "https://i.pravatar.cc/150?u=nadia",
    status: "Product Designer",
    online: true,
    verified: true,
  },
  {
    id: "aiden",
    name: "Aiden Foster",
    avatar: "https://i.pravatar.cc/150?u=aiden",
    status: "iOS Developer",
    online: true,
    verified: false,
  },
  {
    id: "maya",
    name: "Maya Singh",
    avatar: "https://i.pravatar.cc/150?u=maya",
    status: "UX Researcher",
    online: false,
    verified: false,
  },
  {
    id: "kai",
    name: "Kai Tanaka",
    avatar: "https://i.pravatar.cc/150?u=kai",
    status: "Available for projects",
    online: false,
    verified: false,
  },
  {
    id: "zara",
    name: "Zara Hassan",
    avatar: "https://i.pravatar.cc/150?u=zara",
    status: "Design Systems @Company",
    online: true,
    verified: false,
  },
  {
    id: "liam",
    name: "Liam O'Connor",
    avatar: "https://i.pravatar.cc/150?u=liam",
    status: "Frontend Developer",
    online: false,
    verified: false,
  },
]

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users] = useState(generateUsers())

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderUser = ({ item: user }: { item: User }) => (
    <TouchableOpacity style={$userCard} activeOpacity={0.7}>
      <View style={$userContainer}>
        <View style={$avatarContainer}>
          <Image source={{ uri: user.avatar }} style={$avatar} />
          {user.online && <View style={$onlineBadge} />}
        </View>
        
        <View style={$userInfo}>
          <View style={$nameRow}>
            <Text style={$userName}>{user.name}</Text>
            {user.verified && <Text style={$verifiedBadge}>✓</Text>}
          </View>
          {user.status && (
            <Text style={$userStatus} numberOfLines={1}>
              {user.status}
            </Text>
          )}
        </View>

        <TouchableOpacity style={$followButton}>
          <Text style={$followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <View style={$header}>
        <Text preset="heading" style={$headerText}>
          Discover People
        </Text>
      </View>

      <View style={$searchContainer}>
        <TextInput
          style={$searchInput}
          placeholder="Search people..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.text}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={$listContent}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $header: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
}

const $headerText: TextStyle = {
  fontSize: 32,
}

const $searchContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.sm,
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

const $userCard: ViewStyle = {
  marginBottom: spacing.xs,
}

const $userContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.xs,
}

const $avatarContainer: ViewStyle = {
  position: "relative",
}

const $avatar: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 22,
}

const $onlineBadge: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#4CAF50",
  borderWidth: 2,
  borderColor: colors.background,
}

const $userInfo: ViewStyle = {
  flex: 1,
  marginLeft: spacing.sm,
}

const $nameRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $userName: TextStyle = {
  fontSize: 15,
  fontWeight: "600",
  marginRight: spacing.xs,
}

const $verifiedBadge: TextStyle = {
  color: colors.palette.primary500,
  fontSize: 13,
  marginTop: 1,
}

const $userStatus: TextStyle = {
  fontSize: 13,
  color: colors.dim,
  marginTop: 1,
}

const $followButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  borderRadius: 15,
  marginLeft: spacing.sm,
}

const $followButtonText: TextStyle = {
  color: colors.background,
  fontSize: 13,
  fontWeight: "600",
}