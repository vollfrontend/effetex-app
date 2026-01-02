import React, { FC, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/hooks/useTheme';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: 12,
    },
  });

  return (
    <SafeAreaView
      style={dynamicStyles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <View style={dynamicStyles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default AppLayout;
