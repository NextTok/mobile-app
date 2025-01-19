import { useRef, useState } from "react";
import { Camera, VideoFile } from "react-native-vision-camera";

type UseCameraRecordOptions = {
    initialMaxDuration?: number;
    flash?: "on" | "off"
}

export function useCameraRecord({ initialMaxDuration = 15, flash = "off" }: UseCameraRecordOptions) {
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
                        flash
                    })
                });

                setVideo(video);

            } catch (error) {
                setError(error as Error);
                setIsRecording(false);
            }
        }
    };

    const stopRecording = () => {
        if (cameraRef.current) {
            try {
                cameraRef.current.stopRecording();

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
        cameraRef
    }
}