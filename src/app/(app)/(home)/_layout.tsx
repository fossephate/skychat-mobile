import React from "react"
import { Tabs } from "expo-router/tabs"
import { observer } from "mobx-react-lite"
import { Icon } from "@/components"
import { translate } from "@/i18n"
import { colors, spacing, typography } from "@/theme"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default observer(function Layout() {
  const { bottom } = useSafeAreaInsets()

  const showLabel = false

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 50 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          href: "/contacts",
          headerShown: false,
          tabBarAccessibilityLabel: translate("navigator:contactsTab"),
          tabBarLabel: showLabel ? translate("navigator:contactsTab") : "",
          tabBarIcon: ({ focused }) => (
            // <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
            <FontAwesome name="users" size={28} color={focused ? colors.tint : undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          href: "/chats",
          headerShown: false,
          tabBarAccessibilityLabel: translate("navigator:chatsTab"),
          tabBarLabel: showLabel ? translate("navigator:chatsTab") : "",
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="comments" size={28} color={focused ? colors.tint : undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: "/settings",
          headerShown: false,
          tabBarAccessibilityLabel: translate("navigator:settingsTab"),
          tabBarLabel: showLabel ? translate("navigator:settingsTab") : "",
          tabBarIcon: ({ focused }) => (
            // <Icon icon="settings" color={focused ? colors.tint : undefined} size={30} />
            <FontAwesome name="cog" size={28} color={focused ? colors.tint : undefined} />
          ),
        }}
      />
    </Tabs>
  )
})

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopColor: colors.transparent,
  paddingTop: 4,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
