import React from "react";
import { useTranscription } from "@app/hooks/useTranscription";
import { theme } from "@app/theme";
import { ExpoSpeechRecognitionResult } from "expo-speech-recognition";
import { VideoPlayer } from "expo-video";
import { Text } from "react-native";
import Flexbox from "@app/components/layout/Flexbox";

type TranscriptProps = {
  transcription: ExpoSpeechRecognitionResult | null;
  transcribing: boolean;
  player: VideoPlayer;
};

export const Transcript = ({
  transcribing,
  transcription,
  player,
}: TranscriptProps) => {
  const { segments } = useTranscription(transcription, transcribing, player);

  if (!transcription || transcribing) return null;

  return (
    <Flexbox flexDirection="row" gap="small">
      {segments.map((segment) => {
        return (
          <Text
            key={`${segment.startTimeMillis}-${segment.endTimeMillis}`}
            style={{ color: theme.color.white, fontSize: 30, zIndex: 3 }}
          >
            {segment.segment}
          </Text>
        );
      })}
    </Flexbox>
  );
};
