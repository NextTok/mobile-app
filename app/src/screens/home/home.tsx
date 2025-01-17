import { VideoFeed } from "@app/components/data/VideoFeed";
import Flexbox from "@app/components/layout/Flexbox";
import { useState } from "react";

const videos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export function HomeScreen() {
    const [dimensions, setDimensions] = useState(null);
    
  return (
    <Flexbox flex={1} style={{ position: "relative" }}>
      <VideoFeed videos={videos} />
    </Flexbox>
  );
}
