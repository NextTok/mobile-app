import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { VideoFeedItem } from "./VideoFeedItem";

interface VideoFeedProps {
  videos: string[];
}

export function VideoFeed({ videos }: VideoFeedProps) {
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <VideoFeedItem
            uri={item}
            shouldPlay={index === currentViewableItemIndex}
          />
        )}
        keyExtractor={(item) => item}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
  );
}
