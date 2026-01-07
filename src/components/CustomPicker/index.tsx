// src/components/CustomPicker/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { styles } from './styles';

interface PickerItem {
  label: string;
  value: string;
}

interface CustomPickerProps {
  items: PickerItem[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = 'Оберіть...',
  textColor = '#000',
  borderColor = '#ddd',
  backgroundColor = '#fff',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = items.find(item => item.value === selectedValue);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      // Для iOS використовуємо ActionSheet
      const options = [...items.map(item => item.label), 'Скасувати'];
      const cancelButtonIndex = options.length - 1;

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          if (buttonIndex !== cancelButtonIndex) {
            onValueChange(items[buttonIndex].value);
          }
        },
      );
    } else {
      // Для Android відкриваємо Modal
      setModalVisible(true);
    }
  };

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.pickerButton, { borderColor, backgroundColor }]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.pickerText,
            { color: selectedValue ? textColor : '#999' },
          ]}
        >
          {displayText}
        </Text>
        <Text style={[styles.arrow, { color: textColor }]}>▼</Text>
      </TouchableOpacity>

      {/* Modal для Android */}
      {Platform.OS === 'android' && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{placeholder}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={items}
                keyExtractor={item => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      item.value === selectedValue && styles.selectedItem,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        item.value === selectedValue && styles.selectedItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.value === selectedValue && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
};

