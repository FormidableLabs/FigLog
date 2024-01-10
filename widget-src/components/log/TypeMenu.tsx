import { ChangeTypes } from '../../types/ChangeTypes';
import { COLOR, FONT, GAP, PADDING, SPACE, RADIUS } from '../../utilities/Styles';
import { Type } from './Type';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface TypeMenuProps {
  currentType: string;
}

export const TypeMenu = ({ currentType }: TypeMenuProps) => {

  return (
    <AutoLayout
      positioning="absolute"
      x={-PADDING.sm}
      y={{ type: 'bottom', offset: FONT.lineHeight.xs + PADDING.xs*2 + PADDING.xxs }}
      fill={COLOR.white}
      stroke={COLOR.grey}
      padding={{
        vertical: PADDING.sm,
        horizontal: PADDING.sm,
      }}
      spacing={PADDING.md}
      horizontalAlignItems="start"
      verticalAlignItems="center"
      overflow="visible"
      cornerRadius={RADIUS.sm}
      effect={{
        type: "drop-shadow",
        visible: false,
        color: COLOR.grey,
        offset: { x: 3, y: 3 },
        blur: 8,
        spread: -4,
      }}
    >
      {ChangeTypes.map((changeType) => {
        return (
          <Type type={changeType} key={changeType} isActive={changeType === currentType}/>
        )
      })}
    </AutoLayout>
  )
}