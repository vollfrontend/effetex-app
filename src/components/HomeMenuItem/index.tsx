import { FC } from 'react';
import { View, Text } from 'react-native';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import { HomeMenuItemProps } from './types';

const HomeMenuItem: FC<HomeMenuItemProps> = ({ icon, label }) => {
  const theme = useTheme();

  return (
    <View style={[styles.itemWrapper]}>
      <View style={[styles.iconWrapper, { borderColor: theme.primary }]}>
        {icon}
      </View>
      <Text style={[styles.label, { color: theme.textPrimary }]}>{label}</Text>
    </View>
  );
};

export default HomeMenuItem;
