import {  CameraDevice, CameraPosition, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useState } from 'react';

type FlashMode = "off" | "on";

type UseCameraOptions = {
    initialCameraType: CameraPosition
}

export type UseCameraResult = {
    hasPermission: boolean;
    cameraType: CameraPosition;
    setCameraType: React.Dispatch<React.SetStateAction<CameraPosition>>;
    requestPermission: () => Promise<boolean>;
    flash: FlashMode;
    setFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
    device?: CameraDevice
}

export function useCamera({ initialCameraType }: UseCameraOptions): UseCameraResult {

    const [cameraType, setCameraType] = useState<CameraPosition>(initialCameraType);
    const device = useCameraDevice(cameraType)
    const { hasPermission, requestPermission } = useCameraPermission()

    const [flash, setFlash] = useState<FlashMode>("off");

    return {
        hasPermission,
        cameraType,
        setCameraType,
        requestPermission,
        flash,
        setFlash,
        device
    }
}