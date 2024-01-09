import { COLOR, FONT, GAP } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface DateRangeProps {
  editedDate: string;
  editedTime: string;
  date: string;
  time: string;
  editCount: number;
}

export const DateRange = ({
  editedDate,
  editedTime,
  date,
  time,
  editCount,
}: DateRangeProps) => {
  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.md} verticalAlignItems="center">
      <Text
        name="Created"
        fill={COLOR.black}
        lineHeight={FONT.lineHeight.sm}
        fontFamily={FONT.family}
        fontSize={FONT.size.sm}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.bold}
        textCase="upper"
        hidden={date === undefined}
      >
        {`${date} @ ${time}`}
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
          {`EDITED ${editedDate} @ ${editedTime}`}
        </Text>
      )}
    </AutoLayout>
  );
};
