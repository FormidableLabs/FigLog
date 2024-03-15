import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import {
  COLOR,
  FONT,
  GAP,
  SPACE,
  RADIUS,
  PADDING
} from '../../utilities/Styles';
import { displayDate, createTimestamp } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

interface DateRangeProps {
  changeLog: ChangeLog
  timestamp: number,
  editedTimestamp: number,
  editCount: number;
  editing?: boolean;
  updateChangeState?: (changes: Partial<ChangeLogState>) => void;
}

export const DateRange = ({
  changeLog,
  timestamp,
  editedTimestamp,
  editCount,
  editing = false,
  updateChangeState
}: DateRangeProps) => {
  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.md} verticalAlignItems="center">
      {editing ? (
        <Input
          name="Editable Date"
          fill={COLOR.black}
          inputBehavior="truncate"
          inputFrameProps={{
            fill: COLOR.white,
            stroke: COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xs, vertical: PADDING.xs },
          }}
          placeholder={displayDate(timestamp, 'datetime')}
          value={displayDate(timestamp, 'datetime')}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
          width={SPACE.lg + SPACE.xxxs}
          onTextEditEnd={e => {
            const newCreated = createTimestamp(e.characters);
            if (newCreated !== timestamp) {
              if (!!updateChangeState) {
                updateChangeState({...changeLog.state, updates: { ...changeLog.state?.updates, createdDate: newCreated }})
              }
            }
          }}
        />
      ) : (
        <Text
          name="Created"
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
          hidden={timestamp === undefined}
        >
          {displayDate(timestamp, 'datetime')}
        </Text>
      )}

      {editCount >= 2 && (
        <Text
          name="Edited"
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
        >
          {`EDITED ${displayDate(editedTimestamp, 'datetime')}`}
        </Text>
      )}
    </AutoLayout>
  );
};
