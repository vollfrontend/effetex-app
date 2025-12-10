// React & RN
import { FC } from 'react';
import { View, Text } from 'react-native';

//Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

//Types
import { ProductAttributeGroup } from './types';

interface Props {
  attributes: ProductAttributeGroup[];
}

const ProductAttributes: FC<Props> = ({ attributes }) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {attributes.map(group => (
        <View key={group.name} style={styles.group}>
          <Text style={[styles.groupTitle, { color: theme.textPrimary }]}>
            {group.name}
          </Text>

          {group.attribute.map(attr => (
            <View key={attr.name} style={styles.row}>
              <Text style={[styles.attrName, { color: theme.textSecondary }]}>
                {attr.name}
              </Text>
              <Text style={[styles.attrValue, { color: theme.textPrimary }]}>
                {attr.text}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ProductAttributes;
