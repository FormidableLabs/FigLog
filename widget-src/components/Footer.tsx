import { LogoFigLog } from '../svgs/LogoFigLog';
import { COLOR, GAP, FONT, SPACE } from '../utilities/Styles';

const { widget, showUI } = figma;
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
          const url = 'https://formidable.com/open-source/';
          const openLinkUIString = `<script>window.open('${url}','_blank');</script>`;
          showUI(openLinkUIString, { visible: false });
        }}
      >
        <SVG name="Formidable Logo" height={SPACE.sm + SPACE.xs} width={SPACE.sm + SPACE.xs} src={LogoFigLog} />
        <Text
          fontFamily={FONT.family}
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.xl}
          fontSize={FONT.size.xl}
          fontWeight={FONT.weight.bold}
        >
          FigLog
        </Text>
        <Text
          fontFamily={FONT.family}
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.xl}
          fontSize={FONT.size.xl}
          fontWeight={FONT.weight.light}
        >
          | Evolution Tracker
        </Text>
      </AutoLayout>
    )}
  </AutoLayout>
);
