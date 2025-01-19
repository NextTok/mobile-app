import Flexbox from "@app/components/layout/Flexbox";
import { useCamera, UseCameraResult } from "@app/hooks/useCamera";
import { Camera, CameraView } from "expo-camera";
import {
  Button,
  Text,
} from "react-native";
import * as Styled from "./editor.styled";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@app/theme";
import { useState } from "react";
import { router } from "expo-router";
import { useCameraRecord } from "@app/hooks/useCameraRecord";
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

const CameraFooter = ({ mode }: { mode: "photo" | "video" }) => {
  return (
    <Styled.RecordButton>
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
  } = useCamera({
    initialCameraType: "front",
  });

  const [mode, setMode] = useState<"photo" | "video">("video");

  const { cameraRef, isRecording } = useCameraRecord({
    initialMaxDuration: 15,
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
          <Styled.CameraView
            facing={cameraType}
            ref={cameraRef}
            flash={flash}
          />

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
            <CameraRecordingOptions />
            <CameraFooter mode={mode} />
          </Flexbox>
        </Flexbox>
      </SafeAreaView>
    </Flexbox>
  );
}
