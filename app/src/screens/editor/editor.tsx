import Flexbox from "@app/components/layout/Flexbox";
import { useCamera, UseCameraResult } from "@app/hooks/useCamera";
import { Button, Pressable, Text } from "react-native";
import * as Styled from "./editor.styled";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@app/theme";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
  useCameraRecord,
  UseCameraRecordResult,
} from "@app/hooks/useCameraRecord";
import { CameraRecordingOptions } from "./components/RecordingOptions";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer } from "expo-video";
import { useEvent, useEventListener } from "expo";
import ExpoVideoToAudio from "expo-video-to-audio";
import {
  FinishMode,
  Waveform,
  type IWaveformRef,
} from "@simform_solutions/react-native-audio-waveform";
import { useAudioTranscriber } from "@app/hooks/useSpeechRecognizer";
import { Transcript } from "./components/Transcript";

const CameraHeader = () => {
  return (
    <Flexbox>
      <Ionicons
        size={28}
        name="close-outline"
        color={theme.color.white}
        onPress={() => {
          router.back();
        }}
      />
    </Flexbox>
  );
};

const CameraToolbar = ({
  setCameraType,
  setFlash,
  flash,
}: Pick<
  UseCameraResult,
  "setCameraType" | "setFlash" | "flash" | "cameraType"
>) => {
  return (
    <Flexbox
      flexDirection="column"
      position="absolute"
      right={0}
      gap="xxLarge"
      padding={theme.space.medium}
    >
      <Ionicons
        size={28}
        name="sync-outline"
        color={theme.color.white}
        onPress={() =>
          setCameraType((prevCameraType) =>
            prevCameraType === "back" ? "front" : "back"
          )
        }
      />
      <Ionicons
        size={28}
        name={flash === "off" ? "flash-off-outline" : "flash-outline"}
        color={theme.color.white}
        onPress={() =>
          setFlash((prevFlash) => (prevFlash === "off" ? "on" : "off"))
        }
      />
      <Ionicons size={28} name="timer-outline" color={theme.color.white} />
      <Ionicons
        size={28}
        name="speedometer-outline"
        color={theme.color.white}
      />
    </Flexbox>
  );
};

const CameraFooter = ({
  mode,
  startRecording,
  isRecording,
  stopRecording,
  pickImage,
}: {
  mode: "photo" | "video";
  pickImage: () => Promise<void>;
} & UseCameraRecordResult) => {
  if (isRecording) {
    return (
      <Styled.RecordingButton
        onPress={() => {
          if (mode === "video") {
            stopRecording();
          }
        }}
      ></Styled.RecordingButton>
    );
  }
  return (
    <Flexbox flexDirection="row" alignItems="center" gap="medium">
      <Flexbox flex={1}></Flexbox>
      <Styled.RecordButton
        onPress={() => {
          if (mode === "video") {
            startRecording();
          }
        }}
      >
        <Styled.RecordButtonInner mode={mode} />
      </Styled.RecordButton>
      <Flexbox flex={1}>
        <Pressable onPress={pickImage}>
          <Flexbox
            width={60}
            height={60}
            backgroundColor={theme.color.white}
          ></Flexbox>
        </Pressable>
      </Flexbox>
    </Flexbox>
  );
};

export function EditorScreen() {
  const insets = useSafeAreaInsets();

  const {
    hasPermission,
    requestPermission,
    cameraType,
    flash,
    setCameraType,
    setFlash,
    device,
  } = useCamera({
    initialCameraType: "front",
  });
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);

  const [mode, setMode] = useState<"photo" | "video">("video");

  const waveformRef = useRef<IWaveformRef | null>(null);

  const player = useVideoPlayer(image, (player) => {
    player.loop = true;
    player.timeUpdateEventInterval = 1 / 30;
    player.volume = 0;
  });


  const cameraRecorder = useCameraRecord({
    initialMaxDuration: 15,
    flash,
    onEnd: (video) => {
      setImage(`file://${video.path}`)
    }
  });

  const { transcribe, transcription, recognizing } = useAudioTranscriber({
    onEnd: () => {
      player.play();
    },
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEventListener(player, "playingChange", (payload) => {
    if (payload.isPlaying) {
      waveformRef.current?.startPlayer({ finishMode: FinishMode.loop });
    } else {
      waveformRef.current?.stopPlayer();
    }
  });

  useEffect(() => {
    if (image) {
      (async () => {
        try {
          const { output_file } = await ExpoVideoToAudio.extractAudio({
            videoPath: image,
          });
          
          setAudio(output_file);
          transcribe(output_file);
        } catch (error) {
          console.error("Error processing audio file", error);
          setAudio(null);
        }
      })();
    }
  }, [image]);

  if (!hasPermission) {
    return (
      <Flexbox>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </Flexbox>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#000000", position: "relative" }}
    >
      <Flexbox
        flex={1}
        position="absolute"
        top={-insets.top}
        height="100%"
        width="100%"
      >
        {device && !image && (
          <Styled.CameraView
            device={device}
            ref={cameraRecorder.cameraRef}
            isActive={true}
            video={mode === "video"}
            photo={mode === "photo"}
          />
        )}

        {image && (
          <Pressable
            onPress={() => (isPlaying ? player.pause() : player.play())}
            style={{ flex: 1 }}
          >
            <Styled.VideoView
              player={player}
              nativeControls={false}
              allowsPictureInPicture={false}
            />
          </Pressable>
        )}
      </Flexbox>
      <Flexbox flex={1} position="relative" style={{ zIndex: 1 }}>
        <Flexbox
          flexDirection="row"
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          padding={theme.space.medium}
        >
          <Flexbox
            position="absolute"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Transcript
              transcribing={recognizing}
              transcription={transcription}
              player={player}
            />
          </Flexbox>
          <CameraHeader />
          <CameraToolbar
            setCameraType={setCameraType}
            setFlash={setFlash}
            flash={flash}
            cameraType={cameraType}
          />
        </Flexbox>

        <Flexbox
          flexDirection="column"
          position="absolute"
          width="100%"
          bottom={0}
          alignItems="center"
          gap="medium"
        >
          <CameraRecordingOptions
            onChange={(mode) => setMode(mode === "photo" ? "photo" : "video")}
          />
          {/* {audio && (
            <Waveform
              mode="static"
              path={audio}
              candleSpace={2}
              candleWidth={4}
              scrubColor="white"
              onPlayerStateChange={(playerState) => console.log(playerState)}
              onPanStateChange={(isMoving) => console.log(isMoving)}
              containerStyle={{ width: "100%" }}
              ref={ref}
              
            />
          )} */}
          <CameraFooter mode={mode} {...cameraRecorder} pickImage={pickImage} />
        </Flexbox>
      </Flexbox>
    </SafeAreaView>
  );
}
