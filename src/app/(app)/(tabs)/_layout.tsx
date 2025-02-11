import React from "react"
import { Tabs } from "expo-router/tabs"
import { observer } from "mobx-react-lite"
import { Icon } from "src/components"
import { translate } from "src/i18n"
import { colors, spacing, typography } from "src/theme"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default observer(function Layout() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          href: "/contacts",
          headerShown: false,
          tabBarLabel: translate("demoNavigator.contactsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          href: "/chats",
          headerShown: false,
          tabBarLabel: translate("demoNavigator.chatsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: "/settings",
          headerShown: false,
          tabBarAccessibilityLabel: translate("demoNavigator.settingsTab"),
          tabBarLabel: translate("demoNavigator.settingsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="settings" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tabs>
  )
})

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
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
