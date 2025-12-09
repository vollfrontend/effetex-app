// React & RN
import { FC } from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { BackIcon, ShareIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import { ProductHeaderProps } from './types';
import { RootStackNavigationProp } from '@/src/navigation/types';
import { COLORS } from '@/src/constants/colors';

const ProductHeader: FC<ProductHeaderProps> = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.header, Platform.OS === 'android' && styles.headerAndroid]}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.leftBtn} onPress={() => navigation.goBack()}>
        <BackIcon color={COLORS.iconDefault} focused={false} size={24} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        Огляд
      </Text>

      {/* Share Button */}
      <TouchableOpacity style={styles.rightBtn} onPress={() => console.log('Share')}>
        <ShareIcon color={COLORS.iconDefault} focused={false} size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductHeader;
