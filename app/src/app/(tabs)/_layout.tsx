import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, ViewStyle } from 'react-native';

import { HapticTab } from '@app/components/HapticTab';
import { IconSymbol } from '@app/components/ui/IconSymbol';
import TabBarBackground from '@app/components/ui/TabBarBackground';
import { Colors } from '@app/constants/Colors';
import { useColorScheme } from '@app/hooks/useColorScheme';
import { Ionicons } from "@expo/vector-icons";

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
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderTopWidth: 0,
            elevation: 0
          },
          default: {
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="paper-plane-outline" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />
        }}
      />
    </Tabs>
  );
}
