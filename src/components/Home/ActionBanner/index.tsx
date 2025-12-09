import React, { FC } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { styles } from './styles';

// screen width for full-width banner
const screenWidth: number = Dimensions.get('window').width;

const ActionBanner: FC = () => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { width: screenWidth }]}>
        <Svg width={screenWidth} height={44} style={styles.gradient}>
          <Defs>
            <LinearGradient id="bannerGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#00204A" stopOpacity={1} />
              <Stop offset="1" stopColor="#001431" stopOpacity={1} />
            </LinearGradient>
          </Defs>

          <Rect x={0} y={0} width={screenWidth} height={44} rx={0} fill="url(#bannerGradient)" />
        </Svg>

        <Text style={styles.text}>
          <Text style={styles.white}>ЧОРНА ПʼЯТНИЦЯ ДО </Text>
          <Text style={styles.yellow}>–70%</Text>
        </Text>
      </View>
    </View>
  );
};

export default ActionBanner;
