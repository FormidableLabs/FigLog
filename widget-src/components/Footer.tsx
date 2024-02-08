import { LogoFigLog } from '../svgs/LogoFigLog';
import { COLOR, GAP, FONT, SPACE, PADDING } from '../utilities/Styles';

const { widget, openExternal } = figma;
const { AutoLayout, Rectangle, SVG, Text } = widget;

interface FooterProps {
  showBranding: boolean;
}

export const Footer = ({ showBranding }: FooterProps) => (
  <AutoLayout name="Footer" overflow="visible" direction="vertical" spacing={GAP.lg} width="fill-parent">
    <Rectangle name="Divider" fill={COLOR.greyDark} strokeAlign="outside" width="fill-parent" height={SPACE.one} />
    {showBranding && (
      <AutoLayout
        name="Logo"
        overflow="visible"
        spacing={GAP.md}
        verticalAlignItems="center"
        onClick={() => {
          openExternal("https://formidable.com/open-source/");
        }}
      >
        <SVG name="FigLog Logo" height={PADDING.xxl} width={PADDING.xxl} src={LogoFigLog} />
        <AutoLayout
          name="Logo Text"
          spacing={GAP.sm}
        >
          <Text
            fontFamily={FONT.family}
            fill={COLOR.black}
            lineHeight={FONT.lineHeight.xl}
            fontSize={FONT.size.lg}
            fontWeight={FONT.weight.bold}
          >
            FigLog
          </Text>
          <Text
            fontFamily={FONT.family}
            fill={COLOR.black}
            lineHeight={FONT.lineHeight.xl}
            fontSize={FONT.size.lg}
            fontWeight={FONT.weight.light}
          >
            | Evolution Tracker
          </Text>
        </AutoLayout>
      </AutoLayout>
    )}
  </AutoLayout>
);
