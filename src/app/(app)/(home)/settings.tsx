import React from "react"
import { View, ViewStyle, TextStyle, ScrollView, Image, ImageStyle, Switch } from "react-native"
import { Screen, Text, ListItem } from "src/components"
import { colors, spacing } from "src/theme"
import { usePrivy } from "@privy-io/expo";

export default function SettingsScreen() {
  const userProfile = {
    name: "Bob",
    handle: "@bob",
    bio: "Digital creator & tech enthusiast",
    avatar: "https://i.pravatar.cc/150?u=bob",
  }

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)
  const [autoplay, setAutoplay] = React.useState(true)
  const { logout } = usePrivy();

  const renderSwitch = (value: boolean, onValueChange: (value: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.palette.neutral400, true: colors.palette.primary300 }}
      thumbColor={value ? colors.palette.primary500 : colors.palette.neutral200}
    />
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <ScrollView style={$container} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={$profileCard}>
          <View style={$profileHeader}>
            <View style={$avatarContainer}>
              <Image source={{ uri: userProfile.avatar }} style={$avatar} />
            </View>
            <View style={$profileInfo}>
              <Text preset="heading" style={$name}>
                {userProfile.name}
              </Text>
              <Text style={$handle}>{userProfile.handle}</Text>
              <Text style={$bio}>{userProfile.bio}</Text>
            </View>
          </View>
          <ListItem
            text="Edit Profile"
            leftIcon="user"
            style={$editProfileButton}
            textStyle={$editProfileText}
          />
        </View>

        {/* Account Settings */}
        <View style={$section}>
          <Text preset="heading" style={$sectionTitle}>
            Account
          </Text>
          <View style={$sectionContent}>
            <ListItem
              text="Privacy"
              leftIcon="lock"
              rightIcon="caretRight"
              style={$listItem}
            />
            <ListItem
              text="Security"
              leftIcon="shield"
              rightIcon="caretRight"
              style={$listItem}
            />
            <ListItem
              text="Connected Accounts"
              leftIcon="link"
              rightIcon="caretRight"
              style={$listItem}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={$section}>
          <Text preset="heading" style={$sectionTitle}>
            Preferences
          </Text>
          <View style={$sectionContent}>
            <ListItem
              text="Notifications"
              leftIcon="bell"
              style={$listItem}
              RightComponent={renderSwitch(notificationsEnabled, setNotificationsEnabled)}
            />
            <ListItem
              text="Dark Mode"
              leftIcon="moon"
              style={$listItem}
              RightComponent={renderSwitch(darkMode, setDarkMode)}
            />
            <ListItem
              text="Autoplay Media"
              leftIcon="play"
              style={$listItem}
              RightComponent={renderSwitch(autoplay, setAutoplay)}
            />
            <ListItem
              text="Language"
              leftIcon="globe"
              rightIcon="caretRight"
              rightText="English"
              style={$listItem}
            />
          </View>
        </View>

        {/* Storage and Data */}
        <View style={$section}>
          <Text preset="heading" style={$sectionTitle}>
            Storage and Data
          </Text>
          <View style={$sectionContent}>
            <ListItem
              text="Data Usage"
              leftIcon="database"
              rightIcon="caretRight"
              style={$listItem}
            />
            <ListItem
              text="Storage"
              leftIcon="save"
              rightText="1.2 GB"
              rightIcon="caretRight"
              style={$listItem}
            />
          </View>
        </View>

        {/* Support */}
        <View style={$section}>
          <Text preset="heading" style={$sectionTitle}>
            Support
          </Text>
          <View style={$sectionContent}>
            <ListItem
              text="Help Center"
              leftIcon="helpCircle"
              rightIcon="caretRight"
              style={$listItem}
            />
            <ListItem
              text="Report a Problem"
              leftIcon="alertTriangle"
              rightIcon="caretRight"
              style={$listItem}
            />
            <ListItem
              text="Terms of Service"
              leftIcon="fileText"
              rightIcon="caretRight"
              style={$listItem}
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={$section}>
          <ListItem
            text="Log Out"
            leftIcon="logOut"
            style={[$listItem, $destructiveItem]}
            textStyle={$destructiveText}
            onPress={logout}
          />
        </View>

        <View style={$footer}>
          <Text style={$version}>Version 2.1.0</Text>
        </View>
      </ScrollView>
    </Screen>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container: ViewStyle = {
  flex: 1,
}

const $profileCard: ViewStyle = {
  margin: spacing.lg,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 20,
  padding: spacing.lg,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
}

const $profileHeader: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.md,
}

const $avatarContainer: ViewStyle = {
  position: "relative",
}

const $avatar: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
}

const $verifiedBadge: ViewStyle = {
  position: "absolute",
  bottom: -4,
  right: -4,
  backgroundColor: colors.palette.primary500,
  borderRadius: 12,
  width: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.background,
}

const $profileInfo: ViewStyle = {
  flex: 1,
  marginLeft: spacing.md,
}

const $name: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.xs,
}

const $handle: TextStyle = {
  fontSize: 16,
  color: colors.dim,
  marginBottom: spacing.xs,
}

const $bio: TextStyle = {
  fontSize: 14,
  color: colors.text,
}

const $editProfileButton: ViewStyle = {
  backgroundColor: colors.palette.primary100,
  borderRadius: 12,
  marginTop: spacing.sm,
}

const $editProfileText: TextStyle = {
  color: colors.palette.primary500,
  fontWeight: "bold",
}

const $section: ViewStyle = {
  marginBottom: spacing.lg,
}

const $sectionTitle: TextStyle = {
  fontSize: 18,
  marginLeft: spacing.lg,
  marginBottom: spacing.sm,
}

const $sectionContent: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 16,
  marginHorizontal: spacing.lg,
}

const $listItem: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral200,
}

const $destructiveItem: ViewStyle = {
  backgroundColor: colors.palette.angry100,
  marginHorizontal: spacing.lg,
  borderRadius: 16,
}

const $destructiveText: TextStyle = {
  color: colors.error,
}

const $footer: ViewStyle = {
  alignItems: "center",
  padding: spacing.lg,
}

const $version: TextStyle = {
  color: colors.dim,
  fontSize: 12,
}