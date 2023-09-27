import { COLOR, FONT, RADIUS, PADDING } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface TypeProps {
  type: 'Added' | 'Breaking' | 'Changed' | 'Deprecated' | 'Fixed' | 'Other' | 'Removed';
}

export const Type = (props: TypeProps) => {
  let txColor = COLOR.white;
  let bgColor = COLOR.black;
  switch (props.type) {
    case 'Added':
      bgColor = COLOR.green;
      break;
    case 'Breaking':
      bgColor = COLOR.red;
      break;
    case 'Changed':
      bgColor = COLOR.purple;
      break;
    case 'Deprecated':
      bgColor = COLOR.orange;
      break;
    case 'Fixed':
      bgColor = COLOR.blue;
      break;
    case 'Other':
      txColor = COLOR.black;
      bgColor = COLOR.grey;
      break;
    case 'Removed':
      bgColor = COLOR.black;
      break;
    default:
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
      {...props}
    >
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
        {props.type}
      </Text>
    </AutoLayout>
  );
};
