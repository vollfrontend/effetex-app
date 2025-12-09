import React, { FC, PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps, View } from 'react-native';

import { styles } from './styles';

interface AppScrollViewProps extends ScrollViewProps {
  children: PropsWithChildren['children'];
}

const AppScrollView: FC<AppScrollViewProps> = ({
  children,
  contentContainerStyle,
  style,
  ...rest
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      {...rest}
    >
      <View>{children}</View>
    </ScrollView>
  );
};

export default AppScrollView;
