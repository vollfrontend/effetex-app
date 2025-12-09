// React & RN
import React, { FC } from 'react';
import { View, Text } from 'react-native';

// Components
import { CardIcon, SubscriptionIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import { PromoBlockProps } from './types.ts';

const PromoBlock: FC<PromoBlockProps> = ({ title, subtitle, image, color }) => {
  return (
    <View style={[styles.wrapper, { backgroundColor: color }]}>
      {image === 'card' && <CardIcon focused={false} color="#FFFFFF" size={24} />}
      {image === 'subscribe' && <SubscriptionIcon focused={false} color="#FFFFFF" size={24} />}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default PromoBlock;
