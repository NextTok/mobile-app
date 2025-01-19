import styled from "styled-components/native";
import RNPagerView from 'react-native-pager-view';
import { Camera } from "react-native-vision-camera";

export const CameraView = styled(Camera)`
    flex: 1;
`;

export const PagerView = styled(RNPagerView)`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const RecordButton = styled.Pressable`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    border-color: ${({ theme }) => theme.color.white};
    border-width: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RecordButtonInner = styled.Pressable<{ mode: "photo" | "video" }>`
    width: 58px;
    height: 58px;
    border-radius: 32px;
    background-color: ${({ theme, mode }) => mode === "video" ? theme.color.red.primary : theme.color.white};
`;

export const RecordingButton = styled.Pressable`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    border-color: ${({ theme }) => theme.color.red.primary};
    border-width: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;