import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfigParams,
} from 'react-native-toast-message';

/**
 * Кастомна конфігурація для Toast повідомлень
 */
export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
  info: (props: ToastConfigParams<any>) => (
    <InfoToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 5,
    height: 80,
    backgroundColor: '#FFFFFF',
  },
  errorToast: {
    borderLeftColor: '#F44336',
    borderLeftWidth: 5,
    height: 80,
    backgroundColor: '#FFFFFF',
  },
  infoToast: {
    borderLeftColor: '#2196F3',
    borderLeftWidth: 5,
    height: 80,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  text2: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});

