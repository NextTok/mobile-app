import { Tabs } from "expo-router";
import React from "react";
import { Platform, ViewStyle } from "react-native";
import { HapticTab } from "@app/components/HapticTab";
import { useColorScheme } from "@app/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import Flexbox from "@app/components/layout/Flexbox";
import { theme } from "@app/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff0f7b",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select<ViewStyle>({
          ios: {
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderTopWidth: 0,
            elevation: 0,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "paper-plane" : "paper-plane-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIconStyle: {
            position: "relative",
          },
          tabBarIcon: ({ color, focused }) => (
              <Flexbox
                width={40}
                height={40}
                alignItems="center"
                justifyContent="center"
                style={{
                  backgroundColor: "#ff0f7b",
                  borderRadius: 20,
                  position: "absolute",
                  top: 0,
                }}
              >
                <Ionicons name={"add"} size={20} color={theme.color.white} />
              </Flexbox>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbox" : "chatbox-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
