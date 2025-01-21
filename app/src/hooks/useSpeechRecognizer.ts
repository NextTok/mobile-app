import {
  AudioEncodingAndroid,
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import {
  ExpoSpeechRecognitionResult,
  LanguageDetectionEvent,
} from "expo-speech-recognition/build/ExpoSpeechRecognitionModule.types";
import { useCallback, useState } from "react";
import { Platform } from "react-native";

type UseAudioTranscriberOptions = {
  onEnd?: () => void;
};

export function useAudioTranscriber({
  onEnd,
}: UseAudioTranscriberOptions = {}) {
  const [transcription, setTranscription] = useState<
    ExpoSpeechRecognitionResult | null
  >(null);
  const [recognizing, setRecognizing] = useState(false);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));

  useSpeechRecognitionEvent("end", () => {
    setRecognizing(false);

    if (onEnd) onEnd();
  });

  const [languageDetection, setLanguageDetection] =
    useState<LanguageDetectionEvent | null>(null);

  useSpeechRecognitionEvent("languagedetection", (event) => {
    setLanguageDetection(event);
  });

  const transcribe = useCallback(
    (uri: string) => {
      setTranscription(() => null);

      ExpoSpeechRecognitionModule.start({
        lang: languageDetection?.detectedLanguage ?? "en-US",
        interimResults: true,
        requiresOnDeviceRecognition: Platform.OS === "ios",
        audioSource: {
          uri: uri,
          audioChannels: 1,
          audioEncoding: AudioEncodingAndroid.ENCODING_PCM_16BIT,
          sampleRate: 16000,
          chunkDelayMillis: 15,
        },
      });
    },
    [languageDetection]
  );

  useSpeechRecognitionEvent("result", (ev) => {
    if (ev.isFinal && ev.results[0]) {
      const transcription = { ...ev.results[0], segments: ev.results[0].segments.map((segment) => ({ ...segment })) }

      setTranscription(() => {
        return transcription
      });
    }
  });
  
  return {
    languageDetection,
    transcribe,
    transcription,
    recognizing,
  };
}
