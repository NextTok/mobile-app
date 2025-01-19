import Flexbox from "@app/components/layout/Flexbox";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { VideoFeedItemSidebar } from "./VideoFeedItemSidebar";
import { useFocusEffect } from "expo-router";

interface VideoFeedItemProps {
  shouldPlay: boolean;
  uri: string;
}

export function VideoFeedItem({ shouldPlay, uri }: VideoFeedItemProps) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const { status, error } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [shouldPlay]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        player.pause();
      };
    }, [])
  );
  
  return (
    <Pressable onPress={() => (isPlaying ? player.pause() : player.play())}>
      <View style={styles.container}>
        <VideoView
          style={styles.video}
          player={player}
          contentFit="cover"
          nativeControls={false}
          allowsPictureInPicture={false}
        />
        <Flexbox
          style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
          width={60}
          height={Dimensions.get("screen").height}
        >
          <VideoFeedItemSidebar />
        </Flexbox>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
