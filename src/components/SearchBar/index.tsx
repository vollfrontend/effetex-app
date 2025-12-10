// React & RN
import { FC, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native';

// i18n
import { useTranslation } from 'react-i18next';

// Components
import { SearchIcon, MicIcon, QrCodeIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

interface SearchBarProps {
  value?: string;
  showMic?: boolean;
  showQr?: boolean;
  onChangeText?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onMicPress?: () => void;
  onQrPress?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  showMic = true,
  showQr = true,
  onMicPress,
  onQrPress,
  onChangeText,
  onSubmit,
}) => {
  const [localValue, setLocalValue] = useState<string>('');
  const theme = useTheme();
  const { t } = useTranslation();

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

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ): void => {
    onSubmit?.(e.nativeEvent.text);
  };

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor: theme.cardBackground },
      ]}
    >
      <SearchIcon focused={false} color={theme.iconDefault} size={18} />

      <TextInput
        style={[styles.input, { color: theme.textPrimary }]}
        placeholder={t('search.placeholder')}
        placeholderTextColor={theme.textSecondary}
        value={value !== undefined ? value : localValue}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      <View style={styles.rightIcons}>
        {showMic && (
          <TouchableOpacity onPress={onMicPress}>
            <MicIcon focused={false} color={theme.iconDefault} size={26} />
          </TouchableOpacity>
        )}
        {showQr && (
          <TouchableOpacity onPress={onQrPress}>
            <QrCodeIcon focused={false} color={theme.iconDefault} size={26} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
