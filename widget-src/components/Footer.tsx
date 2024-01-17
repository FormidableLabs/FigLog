import { LogoFormidable } from '../svgs/LogoFormidable';
import { COLOR, GAP, OPACITY, SPACE } from '../utilities/Styles';

const { widget, openExternal } = figma;
const { AutoLayout, Rectangle, SVG } = widget;

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
        opacity={OPACITY.semiOpaque}
        onClick={() => {
          openExternal("https://formidable.com/open-source/");
        }}
        hoverStyle={{
          opacity: OPACITY.opaque,
        }}
      >
        <SVG name="Formidable Logo" height={SPACE.sm} width={SPACE.md} src={LogoFormidable} />
      </AutoLayout>
    )}
  </AutoLayout>
);
