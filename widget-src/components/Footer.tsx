import { LogoFormidable } from '../svgs/LogoFormidable';
import { COLOR, GAP, OPACITY, SPACE } from '../utilities/Styles';

const { widget, showUI } = figma;
const { AutoLayout, Rectangle, SVG } = widget;

interface FooterProps {
  showBranding: boolean;
}

export const Footer = (props: FooterProps) => (
  <AutoLayout name="Footer" overflow="visible" direction="vertical" spacing={GAP.lg} width="fill-parent">
    <Rectangle name="Divider" fill={COLOR.greyDark} strokeAlign="outside" width="fill-parent" height={SPACE.one} />
    {props.showBranding && (
      <AutoLayout
        name="Logo"
        overflow="visible"
        spacing={GAP.md}
        verticalAlignItems="center"
        opacity={OPACITY.semiOpaque}
        onClick={() => {
          const url = 'https://formidable.com/open-source/';
          const openLinkUIString = `<script>window.open('${url}','_blank');</script>`;
          showUI(openLinkUIString, { visible: false });
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
