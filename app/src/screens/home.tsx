import { VideoFeed } from "@app/components/data/VideoFeed";
import { useState } from "react";
import { View } from "react-native";

const videos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export function HomeScreen() {
    const [dimensions, setDimensions] = useState(null);
    
  return (
    <View style={{ flex: 1 }}>
      <VideoFeed videos={videos} />
    </View>
  );
}
