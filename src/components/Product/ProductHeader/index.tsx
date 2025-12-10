// React & RN
import { FC } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { BackIcon, ShareIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import { ProductHeaderProps } from './types';
import { RootStackNavigationProp } from '@/src/navigation/types';

const ProductHeader: FC<ProductHeaderProps> = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const theme = useTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.header,
        Platform.OS === 'android' && styles.headerAndroid,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.leftBtn}
        onPress={() => navigation.goBack()}
      >
        <BackIcon color={theme.iconDefault} focused={false} size={24} />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[styles.title, { color: theme.textPrimary }]}
        numberOfLines={1}
      >
        Огляд
      </Text>

      {/* Share Button */}
      <TouchableOpacity
        style={styles.rightBtn}
        onPress={() => console.log('Share')}
      >
        <ShareIcon color={theme.iconDefault} focused={false} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductHeader;
