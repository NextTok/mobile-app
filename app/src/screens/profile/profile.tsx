import { Text } from "@app/components/general/Text";
import Flexbox from "@app/components/layout/Flexbox";
import { useUser } from "@app/providers/AuthProvider";
import { usePosts } from "@app/react-query/queries/useMyPosts";
import { theme } from "@app/theme";
import { Dimensions, Image, SafeAreaView } from "react-native";
import chunk from "lodash/chunk";
import { useMemo } from "react";

const videoThumbnailWidth = Dimensions.get("screen").width / 3;
const videoThumbnailHeight = 200;

export function ProfileScreen() {
  const user = useUser();

  const { data } = usePosts();

  const posts = useMemo(() => {
    if (data) return chunk(data, 3);
    return [];
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flexbox flex={1} gap="medium" paddingHorizontal={theme.space.medium}>
        <Flexbox alignItems="center">
          <Text fontFamily="RobotoMedium">
            {user.displayName ?? user.handle}
          </Text>
        </Flexbox>
        <Flexbox alignItems="center">
          {user.avatar && (
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 80,
                height: 80,
                borderRadius: theme.borderRadius.circle(80),
              }}
            />
          )}
        </Flexbox>
        <Flexbox alignItems="center">
          <Text fontFamily="RobotoMedium">@{user.handle}</Text>
        </Flexbox>
        <Flexbox
          gap="medium"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Flexbox flexDirection="column" alignItems="center">
            <Text fontFamily="RobotoMedium">{user.followsCount ?? 0}</Text>
            <Text fontSize="small" type="helper">
              Following
            </Text>
          </Flexbox>
          <Flexbox flexDirection="column" alignItems="center">
            <Text fontFamily="RobotoMedium">{user.followersCount ?? 0}</Text>
            <Text fontSize="small" type="helper">
              Followers
            </Text>
          </Flexbox>
          <Flexbox flexDirection="column" alignItems="center">
            <Text fontFamily="RobotoMedium">{user.postsCount ?? 0}</Text>
            <Text fontSize="small" type="helper">
              Posts
            </Text>
          </Flexbox>
        </Flexbox>
        <Flexbox>
          <Text textAlign="center">{user.description}</Text>
        </Flexbox>
        <Flexbox flex={1} style={{ borderTopWidth: 1, borderTopColor: theme.color.lightGray }}>
          {posts.map((row, index) => {
            const rows = new Array(3).fill(null).map((_, i) => {
              return row[i] ?? undefined;
            });

            return (
              <Flexbox key={index} flexDirection="row">
                {rows.map((post, postIndex) => {
                  if (!post) return <Flexbox flex={1} key={postIndex} />;
                  console.log(post);

                  return (
                    <Flexbox flex={1} key={post.uri}>
                      <Image
                        source={{ uri: post.thumbnail }}
                        style={{ width: "100%", height: videoThumbnailHeight }}
                      />
                    </Flexbox>
                  );
                })}
              </Flexbox>
            );
          })}
        </Flexbox>
      </Flexbox>
    </SafeAreaView>
  );
}
