import { LogoFormidable } from '../svgs/LogoFormidable';

const { widget } = figma;
const { AutoLayout, Frame, Rectangle, SVG } = widget;

interface FooterProps {}

export const Footer = (props: FooterProps) => (
  <AutoLayout name="Footer" overflow="visible" direction="vertical" spacing={16} width={752}>
    <Rectangle name="Divider" fill="#2F2D2E" strokeAlign="outside" width="fill-parent" height={1} />
    <AutoLayout name="Logo" overflow="visible" spacing={8} verticalAlignItems="center">
      <SVG name="Formidable Logo" height={24} width={108} src={LogoFormidable} />
    </AutoLayout>
  </AutoLayout>
);
