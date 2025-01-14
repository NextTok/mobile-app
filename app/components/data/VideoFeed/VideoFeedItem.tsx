import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

interface VideoFeedItemProps {
  shouldPlay: boolean;
  uri: string;
}

export function VideoFeedItem({ shouldPlay, uri }: VideoFeedItemProps) {
  const video = useRef<Video | null>(null);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (!video.current) return;

    if (shouldPlay) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
      video.current.setPositionAsync(0);
    }
  }, [shouldPlay]);

  return (
    <Pressable
      onPress={() =>
        status.isPlaying
          ? video.current?.pauseAsync()
          : video.current?.playAsync()
      }
    >
      <View style={styles.container}>
        <Video
          ref={video}
          source={{ uri }}
          style={styles.video}
          isLooping
          resizeMode={ResizeMode.COVER}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
