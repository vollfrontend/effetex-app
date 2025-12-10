// React & RN
import type { FC } from 'react';
import { View, Dimensions, Image } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { decode } from 'html-entities';
import { SvgUri } from 'react-native-svg';
import { COLORS } from '@/src/constants/colors';

// Utils
import { cleanHtml } from '@/src/utils/cleanHtml';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

interface Props {
  html: string;
}

interface ImgRendererProps {
  tnode: {
    attributes: {
      src?: string;
      [key: string]: string | undefined;
    };
  };
}

const { width } = Dimensions.get('window');
const ICON_SIZE = 30;

const renderers = {
  // ---------- IMG ----------
  img: ({ tnode }: ImgRendererProps) => {
    const src = tnode.attributes.src;
    if (!src) return null;

    const isSvg = src.toLowerCase().endsWith('.svg');

    if (isSvg) {
      return (
        <SvgUri
          uri={src}
          width={ICON_SIZE}
          height={ICON_SIZE}
          style={{ marginRight: 12, marginVertical: 8 }}
        />
      );
    }

    return (
      <Image
        source={{ uri: src }}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          resizeMode: 'contain',
          marginRight: 12,
          marginVertical: 8,
        }}
      />
    );
  },

  // ---------- БЕЗПЕЧНИЙ CUSTOM <p> ----------
  p: ({ TDefaultRenderer, tnode, ...props }: any) => {
    const children = tnode.children || [];

    const hasImg = children.some((c: any) => c.tagName === 'img');

    // Якщо немає картинки — нічого не чіпаємо
    if (!hasImg) {
      return <TDefaultRenderer tnode={tnode} {...props} />;
    }

    // Параграф із картинкою, але якщо структура не така, як ми очікуємо —
    // теж не чіпаємо, щоб не падати
    const imgNode = children.find((c: any) => c.tagName === 'img');
    if (!imgNode) {
      return <TDefaultRenderer tnode={tnode} {...props} />;
    }

    const textNode = children.find(
      (c: any) => c.tagName !== 'img' && typeof c.data === 'string',
    );

    // Якщо не знайшли явний текстовий вузол — просто віддаємо дефолт
    if (!textNode || typeof textNode.data !== 'string') {
      return <TDefaultRenderer tnode={tnode} {...props} />;
    }

    // ⚠️ До цього місця ми, швидше за все, не дійдемо з твоїм поточним HTML,
    // але залишимо на майбутнє.
    return (
      <View style={styles.imageBlock}>
        <RenderHTML
          contentWidth={ICON_SIZE}
          source={{ html: `<img src="${imgNode.attributes.src}" />` }}
          renderers={{ img: renderers.img }}
        />

        <RenderHTML
          contentWidth={width - ICON_SIZE - 32}
          source={{ html: textNode.data }}
          tagsStyles={{
            body: { color: COLORS.textPrimary },
            span: { color: COLORS.textPrimary, fontSize: 16 },
          }}
        />
      </View>
    );
  },
};

// ... (renderers object remains, but we need to update usage inside it)

const ProductDescription: FC<Props> = ({ html }) => {
  const decodedHtml: string = decode(html);
  const cleanedHtml: string = cleanHtml(decodedHtml);
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <RenderHTML
        contentWidth={width}
        source={{ html: cleanedHtml }}
        renderers={renderers}
        tagsStyles={{
          body: { color: theme.textPrimary },
          p: { color: COLORS.textPrimary, marginBottom: 10 },
          span: { color: theme.textPrimary },
          li: { color: theme.textPrimary, marginBottom: 6 },
          ul: { paddingLeft: 20, marginBottom: 12 },
        }}
      />
    </View>
  );
};

export default ProductDescription;
