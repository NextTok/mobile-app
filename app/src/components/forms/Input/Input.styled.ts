import styled from "styled-components/native";
import { TextInput as RnTextInput } from 'react-native';

export const Label = styled.Text``;

export const TextInput = styled.TextInput<{ ref?: React.LegacyRef<RnTextInput> }>`
    border-color: #E3E3E3;
    border-width: 1px;
    border-radius: 16px;
    padding: 16px;
    height: 54px;
`;