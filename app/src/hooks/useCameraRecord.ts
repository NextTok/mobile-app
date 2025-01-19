import { CameraView } from "expo-camera";
import { useRef, useState } from "react";

type UseCameraRecordOptions = {
    initialMaxDuration?: number;
}

export function useCameraRecord({ initialMaxDuration = 15 }: UseCameraRecordOptions) {
    const [isRecording, setIsRecording] = useState(false);
    const [maxDuration, setMaxDuration] = useState(initialMaxDuration);
    const cameraRef = useRef<CameraView>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const startRecording = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);

                const video = await cameraRef.current.recordAsync({
                    maxDuration: maxDuration
                });

                setVideo(video?.uri ?? null);

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