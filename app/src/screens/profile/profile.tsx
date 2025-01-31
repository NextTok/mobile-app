import Flexbox from "@app/components/layout/Flexbox";
import { useUser } from "@app/providers/AuthProvider";
import { theme } from "@app/theme";
import { Image, SafeAreaView, Text } from "react-native";

export function ProfileScreen() {
  const user = useUser();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flexbox flex={1} gap="medium" paddingHorizontal={theme.space.medium}>
        <Flexbox alignItems="center">
          <Text>{user.displayName ?? user.handle}</Text>
        </Flexbox>
        <Flexbox alignItems="center">
          {user.avatar && (
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 70,
                height: 70,
                borderRadius: theme.borderRadius.circle(70),
              }}
            />
          )}
        </Flexbox>
        <Flexbox alignItems="center">
          <Text>@{user.handle}</Text>
        </Flexbox>
        <Flexbox
          gap="medium"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Flexbox flexDirection="column" alignItems="center">
            <Text>{user.followsCount ?? 0}</Text>
            <Text>Following</Text>
          </Flexbox>
          <Flexbox flexDirection="column" alignItems="center">
            <Text>{user.followersCount ?? 0}</Text>
            <Text>Followers</Text>
          </Flexbox>
          <Flexbox flexDirection="column" alignItems="center">
            <Text>{user.postsCount ?? 0}</Text>
            <Text>Posts</Text>
          </Flexbox>
        </Flexbox>
        <Flexbox>
          <Text>{user.description}</Text>
        </Flexbox>
      </Flexbox>
    </SafeAreaView>
  );
}
