import { FC } from 'react';
import { Text, TouchableOpacity, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackIcon } from '@/src/components/IconButtons';
import SearchBar from '@/src/components/SearchBar';

import { HeaderProps } from './types';
import { RootStackNavigationProp } from '@/src/navigation/types';

//Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

const Header: FC<HeaderProps> = ({
  title,
  isSearchIncluded = false,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) => {
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
      {/* Топ блок — кнопки + заголовок */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.leftBtn}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color={theme.textPrimary} focused={false} size={24} />
        </TouchableOpacity>

        <Text
          style={[styles.title, { color: theme.textPrimary }]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.rightBtn} />
      </View>

      {/* Блок пошуку (НЕ скролиться, частина Header) */}
      {isSearchIncluded && (
        <View style={styles.searchBlock}>
          <SearchBar
            value={searchValue}
            onChangeText={onSearchChange}
            onSubmit={onSearchSubmit}
            showMic={false}
            showQr={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;
