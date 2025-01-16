import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

interface VideoFeedItemProps {
  shouldPlay: boolean;
  uri: string;
}

export function VideoFeedItem({ shouldPlay, uri }: VideoFeedItemProps) {
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  
  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0
    }
  }, [shouldPlay]);

  return (
    <Pressable
      onPress={() =>
        isPlaying
          ? player.pause()
          : player.play()
      }
    >
      <View style={styles.container}>
        <VideoView
          style={styles.video}
          player={player}
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
