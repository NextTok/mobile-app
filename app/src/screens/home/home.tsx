import { VideoFeed } from "@app/components/data/VideoFeed";
import { IconShadow } from "@app/components/helpers/IconShadow";
import Flexbox from "@app/components/layout/Flexbox";
import { useUser } from "@app/providers/AuthProvider";
import { theme } from "@app/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const videos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export function HomeScreen() {
  const [dimensions, setDimensions] = useState(null);
  const insets = useSafeAreaInsets();

  const user = useUser();

  console.log(user);
  
  return (
    <Flexbox flex={1} style={{ position: "relative" }}>
      <VideoFeed videos={videos} />
      <Flexbox
        width="100%"
        style={{ position: "absolute", top: insets.top }}
        paddingHorizontal={theme.space.medium}
      >
        <Flexbox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flexbox flex={1} alignItems="center">
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: theme.color.white,
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowRadius: 7,
                textShadowOffset: {
                  width: 0,
                  height: 0,
                },
                paddingHorizontal: theme.space.small,
              }}
            >
              For You
            </Text>
          </Flexbox>
          <Flexbox style={{ position: "absolute", right: 0 }}>
            <IconShadow>
              <Ionicons size={25} name="search" color={theme.color.white} />
            </IconShadow>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}
