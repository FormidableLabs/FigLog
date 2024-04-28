import { ChangeType, ChangeTypes } from '../../types/ChangeTypes';
import { COLOR, GAP, PADDING, RADIUS } from '../../utilities/Styles';
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
      y={{ type: 'bottom', offset: PADDING.xxl }}
      fill={COLOR.white}
      stroke={COLOR.grey}
      strokeDashPattern={[]}
      padding={{
        vertical: PADDING.sm,
        horizontal: PADDING.sm,
      }}
      spacing={GAP.sm}
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
      }}
    >
      {ChangeTypes.map(changeType => {
        if (changeType !== 'added' && changeType !== 'none') {
          return (
            <AutoLayout name="Action Wrapper" onClick={() => selectType(changeType)} key={changeType}>
              <Type type={changeType} isActive={changeType === currentType} />
            </AutoLayout>
          );
        }
      })}
    </AutoLayout>
  );
};
