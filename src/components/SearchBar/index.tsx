// React & RN
import React, { FC, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native';

// Components
import { SearchIcon, MicIcon, QrCodeIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';
import { COLORS } from '@/src/constants/colors';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  showMic?: boolean;
  showQr?: boolean;
  onChangeText?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onMicPress?: () => void;
  onQrPress?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  placeholder = 'Я шукаю...',
  showMic = true,
  showQr = true,
  onMicPress,
  onQrPress,
  onChangeText,
  onSubmit,
}) => {
  const [localValue, setLocalValue] = useState<string>('');

  // 🟦 Якщо прийшов зовнішній value → оновлюємо localValue
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (text: string): void => {
    setLocalValue(text);
    onChangeText?.(text);
  };

  const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
    onSubmit?.(e.nativeEvent.text);
  };

  return (
    <View style={styles.searchContainer}>
      <SearchIcon focused={false} color={COLORS.iconDefault} size={18} />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.iconDefault}
        value={value !== undefined ? value : localValue}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      <View style={styles.rightIcons}>
        {showMic && (
          <TouchableOpacity onPress={onMicPress}>
            <MicIcon focused={false} color={COLORS.iconDefault} size={26} />
          </TouchableOpacity>
        )}
        {showQr && (
          <TouchableOpacity onPress={onQrPress}>
            <QrCodeIcon focused={false} color={COLORS.iconDefault} size={26} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
