export type SearchBarProps = {
  placeholder?: string;
  showMic?: boolean;
  showQr?: boolean;
  onMicPress?: () => void;
  onQrPress?: () => void;
  onChangeText: (value: string) => void;
};
