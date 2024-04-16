import { ChangeType, ChangeTypes } from '../../types/ChangeTypes';
import { COLOR, FONT, PADDING, RADIUS } from '../../utilities/Styles';
import { Type } from './Type';

const { widget } = figma;
const { AutoLayout } = widget;

interface TypeMenuProps {
  currentType: ChangeType;
  selectType: (newType: ChangeType) => void;
}

export const TypeMenu = ({ currentType, selectType }: TypeMenuProps) => {
  return (
    <AutoLayout
      positioning="absolute"
      x={-PADDING.sm}
      y={{ type: 'bottom', offset: FONT.lineHeight.xs + PADDING.xs * 2 + PADDING.xxs }}
      fill={COLOR.white}
      stroke={COLOR.grey}
      strokeDashPattern={[]}
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
        type: 'drop-shadow',
        visible: false,
        color: COLOR.grey,
        offset: { x: 3, y: 3 },
        blur: 8,
        spread: -4,
      }}
    >
      {ChangeTypes.map(changeType => {
        if (changeType !== 'added' && changeType !== 'none') {
          return (
            <AutoLayout name="Action Wrapper" onClick={() => selectType(changeType)}>
              <Type type={changeType} key={changeType} isActive={changeType === currentType} />
            </AutoLayout>
          );
        }
      })}
    </AutoLayout>
  );
};
