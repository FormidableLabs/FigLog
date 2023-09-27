import { HelpArrow } from '../svgs/HelpArrow';
import { COLOR, FONT, GAP, PADDING, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, SVG, Text } = widget;

export const ChangeLogEmpty = () => (
  <AutoLayout
    name="Changelog"
    overflow="visible"
    direction="vertical"
    padding={{
      vertical: PADDING.sm,
      horizontal: PADDING.none,
    }}
    width="fill-parent"
  >
    {}
    <AutoLayout
      name="Empty"
      fill={COLOR.white}
      overflow="visible"
      direction="vertical"
      spacing={GAP.md}
      padding={{
        vertical: PADDING.xxl * 2,
        horizontal: PADDING.none,
      }}
      width="fill-parent"
      horizontalAlignItems="center"
    >
      <Text
        name="No changes found in this log. Add your first change here"
        fill={COLOR.black}
        lineHeight={FONT.lineHeight.sm}
        fontFamily={FONT.family}
        fontSize={FONT.size.sm}
        letterSpacing={FONT.letterSpacing.sm}
        textCase="upper"
      >
        no changes found in log. add your first change here
      </Text>
      <SVG name="Arrow" x={570} y={-4} positioning="absolute" height={SPACE.md} width={SPACE.lg} src={HelpArrow} />
    </AutoLayout>
  </AutoLayout>
);
