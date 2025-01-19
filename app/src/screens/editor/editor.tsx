import Flexbox from "@app/components/layout/Flexbox";
import { useCamera, UseCameraResult } from "@app/hooks/useCamera";
import { Button, Text } from "react-native";
import * as Styled from "./editor.styled";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@app/theme";
import { useState } from "react";
import { router } from "expo-router";
import {
  useCameraRecord,
  UseCameraRecordResult,
} from "@app/hooks/useCameraRecord";
import { CameraRecordingOptions } from "./components/RecordingOptions";

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
  stopRecording
}: { mode: "photo" | "video" } & UseCameraRecordResult) => {
  if (isRecording) {
    return (
      <Styled.RecordingButton onPress={() => {
        if (mode === "video") {
          stopRecording();
        }
      }}>

      </Styled.RecordingButton>
    )
  }
  return (
    <Styled.RecordButton
      onPress={() => {
        if (mode === "video") {
          startRecording();
        }
      }}
    >
      <Styled.RecordButtonInner mode={mode} />
    </Styled.RecordButton>
  );
};

export function EditorScreen() {
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

  const [mode, setMode] = useState<"photo" | "video">("video");

  const cameraRecorder = useCameraRecord({
    initialMaxDuration: 15,
    flash,
  });

  if (!hasPermission) {
    return (
      <Flexbox>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </Flexbox>
    );
  }

  return (
    <Flexbox flex={1} backgroundColor="#000000">
      <SafeAreaView style={{ flex: 1 }}>
        <Flexbox flex={1} position="relative">
          {device && (
            <Styled.CameraView
              device={device}
              ref={cameraRecorder.cameraRef}
              isActive={true}
              video={mode === "video"}
              photo={mode === "photo"}
            />
          )}

          <Flexbox
            flexDirection="row"
            width="100%"
            position="absolute"
            top={0}
            padding={theme.space.medium}
          >
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
            <CameraFooter mode={mode} {...cameraRecorder} />
          </Flexbox>
        </Flexbox>
      </SafeAreaView>
    </Flexbox>
  );
}
