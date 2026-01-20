// React & RN
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
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

const iconStyles = StyleSheet.create({
  svg: {
    marginRight: 12,
    marginVertical: 8,
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: 'contain',
    marginRight: 12,
    marginVertical: 8,
  },
});

const ImageRenderer: FC<ImgRendererProps> = ({ tnode }) => {
  const src = tnode.attributes.src;
  if (!src) return null;

  const isSvg = src.toLowerCase().endsWith('.svg');

  if (isSvg) {
    return (
      <SvgUri uri={src} width={ICON_SIZE} height={ICON_SIZE} style={iconStyles.svg} />
    );
  }

  return <Image source={{ uri: src }} style={iconStyles.image} />;
};

const INLINE_ROW_STYLE = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 8,
};

const paragraphRenderer = ({ TDefaultRenderer, tnode, ...props }: any) => {
  const children = tnode.children || [];
  const hasMedia = children.some((child: any) => child.tagName === 'img' || child.tagName === 'svg');

  if (!hasMedia) {
    return <TDefaultRenderer tnode={tnode} {...props} />;
  }

  return (
    <TDefaultRenderer
      tnode={tnode}
      {...props}
      style={[props.style, INLINE_ROW_STYLE]}
    />
  );
};

const renderers = {
  img: ImageRenderer,
  p: paragraphRenderer,
};

const ProductDescription: FC<Props> = ({ html }) => {
  const cleanedHtml = useMemo(() => cleanHtml(decode(html)), [html]);
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

const MemoizedProductDescription = memo(ProductDescription);
MemoizedProductDescription.displayName = 'ProductDescription';

export default MemoizedProductDescription;
