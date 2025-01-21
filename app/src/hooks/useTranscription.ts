import { useEventListener } from "expo";
import {
  ExpoSpeechRecognitionResult,
  ExpoSpeechRecognitionResultSegment,
} from "expo-speech-recognition";
import { VideoPlayer } from "expo-video";
import { useMemo, useState } from "react";
import IntervalTree from "@flatten-js/interval-tree";

export function useTranscription(
  transcription: ExpoSpeechRecognitionResult | null,
  transcribing: boolean,
  player: VideoPlayer
) {
  const intervalTree = useMemo(() => {
    const intervalTree = new IntervalTree<ExpoSpeechRecognitionResultSegment>();

    for (const segment of transcription?.segments ?? []) {
      intervalTree.insert(
        [segment.startTimeMillis, segment.endTimeMillis],
        segment
      );
    }

    return intervalTree;
  }, [transcription]);

  const [segments, setSegments] = useState<
    ExpoSpeechRecognitionResultSegment[]
  >([]);

  const handleTimeUpdate = (
    currentTimeSeconds: number,
    transcription: ExpoSpeechRecognitionResult,
    intervalTree: IntervalTree<ExpoSpeechRecognitionResultSegment>
  ) => {
    if (!transcription) return;

    const currentTime = currentTimeSeconds * 1000;

    const segments = intervalTree.search([currentTime, currentTime]) as ExpoSpeechRecognitionResultSegment[];

    setSegments(segments);
  };

  useEventListener(player, "timeUpdate", (payload) => {
    if (!transcribing && transcription) {
      handleTimeUpdate(payload.currentTime, transcription, intervalTree);
    }
  });

  return { segments };
}
