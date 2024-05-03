import { COLOR, FONT, RADIUS, PADDING, SPACE, GAP } from '../../utilities/Styles';
import { ChangeType } from '../../types/ChangeTypes';
import { Check } from '../../svgs/Check';
import { ActionAddIcon } from '../../svgs/ActionAddIcon';

const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

interface TypeProps {
  type: ChangeType;
  isActive?: boolean;
}

export const Type = ({ type, isActive = false }: TypeProps) => {
  let txColor = COLOR.white;
  let bgColor = COLOR.black;
  let showStroke = false;
  let displayName = '';
  switch (type) {
    case 'none':
    case 'added': // catch legacy logs with "added" as default type
      txColor = COLOR.greyDark;
      bgColor = COLOR.white;
      showStroke = true;
      displayName = 'Log Type';
      break;
    case 'newAdd':
      bgColor = COLOR.green;
      displayName = 'Added';
      break;
    case 'breaking':
      bgColor = COLOR.red;
      displayName = 'Breaking';
      break;
    case 'changed':
      bgColor = COLOR.purple;
      displayName = 'Changed';
      break;
    case 'deprecated':
      bgColor = COLOR.orange;
      displayName = 'Deprecated';
      break;
    case 'fixed':
      bgColor = COLOR.blue;
      displayName = 'Fixed';
      break;
    case 'removed':
      bgColor = COLOR.greyDark;
      displayName = 'Removed';
      break;
    default:
      // other
      txColor = COLOR.black;
      bgColor = COLOR.grey;
      displayName = 'Other';
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
      spacing={GAP.xs}
      positioning="auto"
      stroke={showStroke ? COLOR.grey : ''}
      strokeDashPattern={showStroke ? [SPACE.xxxs, SPACE.xxxs] : []}
    >
      {isActive && <SVG name="Active" height={SPACE.xxs} width={SPACE.xxs} src={<Check color={txColor} />} />}
      {type === ('none' || 'added') && (
        <SVG name="Add" height={SPACE.xxs} width={SPACE.xxs} src={<ActionAddIcon color={txColor} />} />
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
        {displayName}
      </Text>
    </AutoLayout>
  );
};
