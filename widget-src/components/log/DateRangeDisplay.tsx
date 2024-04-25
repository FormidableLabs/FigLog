import { COLOR, FONT, GAP } from '../../utilities/Styles';
import { displayDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface DateRangeProps {
  timestamp: number;
  editedTimestamp: number;
  editCount: number;
}

export const DateRange = ({ timestamp, editedTimestamp, editCount }: DateRangeProps) => {
  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.sm} verticalAlignItems="center">
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
