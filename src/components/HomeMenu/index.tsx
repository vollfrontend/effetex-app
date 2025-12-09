// React & RN
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import HomeMenuItem from '@/src/components/HomeMenuItem';

// Styles
import { styles } from './styles';

// Types
import { HomeMenuProps } from './types';
import { RootStackNavigationProp } from '@/src/navigation/types'; // Navigation types

const HomeMenu: FC<HomeMenuProps> = ({ items }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handlePress = (label: string): void => {
    if (label === 'Категорії') {
      navigation.navigate('Categories'); // ← твій screen name
    }

    // інші кнопки можна додати тут
  };

  return (
    <View style={styles.menuWrapper}>
      {items.map(item => (
        <TouchableOpacity
          key={item.label}
          onPress={() => handlePress(item.label)}
        >
          <HomeMenuItem icon={item.icon} label={item.label} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeMenu;
