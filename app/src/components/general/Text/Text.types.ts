import { Theme } from '@app/theme';
import { TextProps as BaseTextProps, TextStyle } from 'react-native';

export interface TextStyleProps {
    fontFamily?: 'RobotoRegular' | 'RobotoMedium' | 'RobotoBold';
    type?: 'default' | 'helper' | 'primary' | 'error' | 'white' | 'success';
    fontSize?: keyof Theme['fontSize'];
    textAlign?: TextStyle['textAlign']
}

export interface TextProps extends BaseTextProps, TextStyleProps {
}