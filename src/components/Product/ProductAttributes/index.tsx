// React & RN
import { FC } from 'react';
import { View, Text } from 'react-native';

//Styles
import { styles } from './styles';

//Types
import { ProductAttributeGroup } from './types';

interface Props {
  attributes: ProductAttributeGroup[];
}

const ProductAttributes: FC<Props> = ({ attributes }) => {
  return (
    <View style={styles.wrapper}>
      {attributes.map(group => (
        <View key={group.name} style={styles.group}>
          <Text style={styles.groupTitle}>{group.name}</Text>

          {group.attribute.map(attr => (
            <View key={attr.name} style={styles.row}>
              <Text style={styles.attrName}>{attr.name}</Text>
              <Text style={styles.attrValue}>{attr.text}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ProductAttributes;
