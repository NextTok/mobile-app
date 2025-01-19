import { CameraView as ExpoCameraView } from "expo-camera";
import styled from "styled-components/native";
import RNPagerView from 'react-native-pager-view';

export const CameraView = styled(ExpoCameraView)`
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