import { COLOR, FONT, GAP } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface DateRangeProps {
  editedDate: string;
  editedTime: string;
  date: string;
  time: string;
  editCount: number;
  edited?: boolean;
}

export const DateRange = (props: DateRangeProps) => {
  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.md} verticalAlignItems="center" {...props}>
      <Text
        name="Created"
        fill={COLOR.black}
        lineHeight={FONT.lineHeight.sm}
        fontFamily={FONT.family}
        fontSize={FONT.size.sm}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.bold}
        textCase="upper"
        hidden={props.date === undefined}
      >
        {`${props.date} @ ${props.time}`}
      </Text>

      {props.editCount >= 2 && (
        <Text
          name="Edited"
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
        >
          {`EDITED ${props.editedDate} @ ${props.editedTime}`}
        </Text>
      )}
    </AutoLayout>
  );
};
