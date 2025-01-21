import { useRef, useState } from "react";
import { Camera, VideoFile } from "react-native-vision-camera";
import type { FlashMode } from "./useCamera";

type UseCameraRecordOptions = {
  initialMaxDuration?: number;
  flash?: FlashMode;
  onEnd?: (video: VideoFile) => void;
};

export type UseCameraRecordResult = {
    startRecording: () => Promise<VideoFile | null>;
    stopRecording: () => Promise<void>;
    video: VideoFile | null;
    isRecording: boolean;
    setMaxDuration: React.Dispatch<React.SetStateAction<number>>;
    maxDuration: number;
    error: Error | null;
    cameraRef: React.RefObject<Camera>;
    
}

export function useCameraRecord({
  initialMaxDuration = 15,
  flash = "off",
  onEnd
}: UseCameraRecordOptions): UseCameraRecordResult {
  const [isRecording, setIsRecording] = useState(false);
  const [maxDuration, setMaxDuration] = useState(initialMaxDuration);
  const cameraRef = useRef<Camera>(null);
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);

        const video = await new Promise<VideoFile>((resolve, reject) => {
          cameraRef.current?.startRecording({
            onRecordingFinished: resolve,
            onRecordingError: reject,
            flash,
          });
        });

        setTimeout(async () => {
          await stopRecording();
        }, maxDuration * 1000);

        setVideo(video);

        if (onEnd) onEnd(video);

        return video;
      } catch (error) {
        setError(error as Error);
        setIsRecording(false);

        return null;
      }
    }

    return null;
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.stopRecording();

        setIsRecording(false);
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  return {
    startRecording,
    stopRecording,
    video,
    isRecording,
    setMaxDuration,
    maxDuration,
    error,
    cameraRef,
  };
}
