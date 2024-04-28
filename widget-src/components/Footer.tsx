import { LogoFigLog } from '../svgs/LogoFigLog';
import { LogoNearform } from '../svgs/LogoNearform';
import { COLOR, GAP, FONT, RADIUS, SPACE, PADDING } from '../utilities/Styles';

const { widget, openExternal } = figma;
const { AutoLayout, Rectangle, SVG, Text } = widget;

export const Footer = () => (
  <AutoLayout
    name="Footer"
    overflow="visible"
    direction="vertical"
    spacing={GAP.lg}
    width="fill-parent"
    padding={{ top: PADDING.xl }}
  >
    <Rectangle
      name="Divider"
      fill={COLOR.greyDark}
      strokeAlign="outside"
      width="fill-parent"
      height={SPACE.one}
      cornerRadius={RADIUS.md}
    />
    <AutoLayout name="Row" overflow="visible" spacing="auto" width="fill-parent" verticalAlignItems="center">
      <AutoLayout
        name="FigLog Logo"
        overflow="visible"
        spacing={GAP.sm}
        verticalAlignItems="center"
        onClick={() => {
          openExternal('https://commerce.nearform.com/open-source/');
        }}
      >
        <SVG name="FigLog Logo" height={32} width={32} src={LogoFigLog} />
        <AutoLayout name="FigLog Logo Text" spacing={GAP.xs}>
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
      <AutoLayout
        name="Nearform_Commerce Logo"
        overflow="visible"
        spacing={GAP.sm}
        verticalAlignItems="center"
        onClick={() => {
          openExternal('https://commerce.nearform.com/');
        }}
      >
        <SVG name="Nearform_Commerce Logo" height={16} width={174} src={LogoNearform} />
      </AutoLayout>
    </AutoLayout>
  </AutoLayout>
);
