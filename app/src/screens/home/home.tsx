import { VideoFeed } from "@app/components/data/VideoFeed";
import Flexbox from "@app/components/layout/Flexbox";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { Sidebar } from "./components/Sidebar";

const videos = [
  require("@assets/videos/ForBiggerFun.mp4"),
  require("@assets/videos/ForBiggerBlazes.mp4"),
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export function HomeScreen() {
    const [dimensions, setDimensions] = useState(null);
    
  return (
    <Flexbox flex={1} style={{ position: "relative" }}>
      
      <VideoFeed videos={videos} />
      <Flexbox style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }} width={60} height={Dimensions.get("screen").height}>
        <Sidebar />
      </Flexbox>
    </Flexbox>
  );
}
