import React, { FC, PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';

import { styles } from './styles';

interface AppTextProps extends TextProps {
  children: PropsWithChildren['children'];
}

const AppText: FC<AppTextProps> = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
