import { CameraView, CameraType, useCameraPermissions, FlashMode, PermissionResponse } from 'expo-camera';
import { useState } from 'react';

type UseCameraOptions = {
    initialCameraType: CameraType
}

export type UseCameraResult = {
    hasPermission: boolean;
    cameraType: CameraType;
    setCameraType: React.Dispatch<React.SetStateAction<CameraType>>;
    requestPermission: () => Promise<PermissionResponse>;
    flash: FlashMode;
    setFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}

export function useCamera({ initialCameraType }: UseCameraOptions): UseCameraResult {
    const [cameraType, setCameraType] = useState<CameraType>(initialCameraType);
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState<FlashMode>("off");

    return {
        hasPermission: (permission && permission.granted) ?? false,
        cameraType,
        setCameraType,
        requestPermission,
        flash,
        setFlash
    }
}