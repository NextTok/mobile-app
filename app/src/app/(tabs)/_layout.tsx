import { Tabs } from "expo-router";
import React from "react";
import { Platform, ViewStyle } from "react-native";
import { HapticTab } from "@app/components/helpers/HapticTab";
import { useColorScheme } from "@app/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import Flexbox from "@app/components/layout/Flexbox";
import { theme } from "@app/theme";

const TabIcon = (props: React.ComponentProps<typeof Ionicons>) => {
  return (
    <Flexbox
      style={
        {
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.6,
          shadowRadius: 2,
          elevation: 3,
        }
      }
    >
      <Ionicons {...props} />
    </Flexbox>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#ff0f7b",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select<ViewStyle>({
          ios: {
            position: "absolute",
            backgroundColor:
              route.name === "index"
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(0, 0, 0, 1)",
            borderTopWidth: 0,
            elevation: 0,
          },
          default: {},
        }),
        tabBarLabelStyle: {
          textShadowColor: "rgba(0, 0, 0, 1)",
          textShadowRadius: 4,
          textShadowOffset: {
            width: 0,
            height: 0,
          },
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
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
            <TabIcon
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
            <TabIcon
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
            <TabIcon
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
