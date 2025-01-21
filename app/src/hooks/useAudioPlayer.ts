import { useAudioPlayer } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect } from "react";

export function useAudioWaveform(fileUri: string | undefined | null) {
  const buffer = useCallback(async () => {
    if (fileUri) {
      const encoding = FileSystem.EncodingType.Base64;

      const base64String = await FileSystem.readAsStringAsync(fileUri, {
        encoding: encoding,
      });

      const arrayBuffer = Buffer.from(base64String, encoding);

      return arrayBuffer.buffer;
    }
    return null;
  }, [fileUri]);

  useEffect(() => {
    if (fileUri) {
      buffer().then(console.log);
    }
  }, [fileUri]);
}
