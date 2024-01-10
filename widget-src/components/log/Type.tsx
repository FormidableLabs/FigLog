import { COLOR, FONT, RADIUS, PADDING, SPACE } from '../../utilities/Styles';
import { ChangeType } from '../../types/ChangeTypes'
import { Check } from '../../svgs/Check';

const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

interface TypeProps {
  type: ChangeType;
  isActive?: boolean;
}

export const Type = ({ type, isActive = false }: TypeProps) => {
  let txColor = COLOR.white;
  let bgColor = COLOR.black;
  switch (type) {
    case 'added':
      bgColor = COLOR.green;
      break;
    case 'breaking':
      bgColor = COLOR.red;
      break;
    case 'changed':
      bgColor = COLOR.purple;
      break;
    case 'deprecated':
      bgColor = COLOR.orange;
      break;
    case 'fixed':
      bgColor = COLOR.blue;
      break;
    case 'removed':
      bgColor = COLOR.greyDark;
      break;
    default:
      // other
      txColor = COLOR.black;
      bgColor = COLOR.grey;
      break;
  }
  return (
    <AutoLayout
      name="Log Type"
      fill={bgColor}
      cornerRadius={RADIUS.lg}
      padding={{
        vertical: PADDING.xs,
        horizontal: PADDING.md,
      }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      spacing={SPACE.xxxs}
    >
      {isActive && (
        <SVG name="Active" height={PADDING.sm} width={PADDING.md} src={<Check color={txColor}/>} />
      )}
      <Text
        name="Type"
        fill={txColor}
        verticalAlignText="center"
        horizontalAlignText="center"
        lineHeight={FONT.lineHeight.xs}
        fontFamily={FONT.family}
        fontSize={FONT.size.xs}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.bold}
        textCase="upper"
      >
        {type}
      </Text>
    </AutoLayout>
  );
};
