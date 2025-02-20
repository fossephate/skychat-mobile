import React, { useState, useEffect } from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle, TextInput } from "react-native"
import { ListView, Screen, Text } from "src/components"
import { ThemedStyle } from "src/theme"
import { useStores } from "src/models"
import { Agent } from '@atproto/api'
import { useAppTheme } from "src/utils/useAppTheme"
import { ListItem } from "src/components/ListItem"

interface User {
  did: string
  handle: string
  displayName?: string
  avatar?: string
  description?: string
  verified?: boolean
  online?: boolean
}

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { authStore } = useStores()
  const { themed } = useAppTheme()

  useEffect(() => {
    async function fetchFollowing() {
      const client = authStore.client;
      const session = authStore.session;
      if (!client || !session) return;
      try {
        const agent = new Agent(session);

        // Get the user's following list
        const following = await agent.getFollows({
          actor: session.did,
          limit: 100,
        })

        // Get detailed profiles for each followed user
        const profiles = await agent.getProfiles({
          actors: following.data.follows.map(f => f.did),
        })

        const formattedUsers: User[] = profiles.data.profiles.map(profile => ({
          did: profile.did,
          handle: profile.handle,
          displayName: profile.displayName || profile.handle,
          avatar: profile.avatar,
          description: profile.description,
          verified: profile.viewer?.muted !== true, // Just an example condition
          online: false, // We could implement real online status later
        }))

        setUsers(formattedUsers)
      } catch (error) {
        console.error('Error fetching following:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFollowing()
  }, [authStore.session])

  const filteredUsers = users.filter(
    user =>
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderUser = ({ item: user }: { item: User }) => (
    <ListItem
      LeftComponent={
        <View style={themed($avatarContainer)}>
          <Image
            source={{ uri: user.avatar || 'https://i.pravatar.cc/150' }}
            style={themed($avatar)}
          />
          {user.online && <View style={themed($onlineBadge)} />}
        </View>
      }
      topSeparator={false}
      bottomSeparator
      height={72}
    >
      <View style={themed($userInfo)}>
        <Text text={user.displayName} size="xs" style={themed($userName)} numberOfLines={1} />
        {user.description && <Text text={user.description} size="xs" style={themed($userStatus)} numberOfLines={1} />}
      </View>
    </ListItem>
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={themed($screenContainer)}>
      <View style={themed($header)}>
        <Text tx="contactsScreen:title" preset="heading" style={themed($headerText)} />
      </View>
      <View style={themed($searchContainer)}>
        <TextInput
          style={themed($searchInput)}
          tx="contactsScreen:searchPlaceholder"
          value={searchQuery}
          onChangeText={setSearchQuery}
        // placeholderTextColor={colors.text}
        />
      </View>

      <ListView
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item: any) => item.did}
        estimatedItemSize={72}
        contentContainerStyle={themed($listContent)}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}

const $screenContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $header: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
})

const $headerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 32,
  color: colors.text,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.sm,
})

const $searchInput: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  height: 40,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 20,
  paddingHorizontal: spacing.md,
  fontSize: 16,
  color: colors.text,
})

const $listContent: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.lg,
})

const $userCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.xs,
})

const $userContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.xs,
})

const $avatarContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "relative",
  width: 44,
  height: 44,
  marginRight: spacing.md,
  justifyContent: "center",
  marginTop: "auto",
  marginBottom: "auto",
})

const $avatar: ThemedStyle<ImageStyle> = ({ colors }) => ({
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: colors.palette.neutral300,
})

const $onlineBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#4CAF50",
  borderWidth: 2,
  borderColor: colors.background,
})

const $userInfo: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  marginLeft: spacing.sm,
})

const $nameRow: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
})

const $userName: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 15,
  fontWeight: "600",
  marginRight: spacing.xs,
})

const $verifiedBadge: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary500,
  fontSize: 13,
  marginTop: 1,
})

const $userStatus: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginTop: 1,
})

const $followButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary500,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  borderRadius: 15,
  marginLeft: spacing.sm,
})

const $followButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
  fontSize: 13,
  fontWeight: "600",
})