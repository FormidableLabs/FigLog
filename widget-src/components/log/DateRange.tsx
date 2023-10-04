import { COLOR, FONT, GAP } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Span, Text } = widget;

interface DateRangeProps {
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
        {props.date}
      </Text>
      {/* <Text
        name="Time"
        fill={COLOR.greyDark}
        lineHeight={FONT.lineHeight.sm}
        fontFamily={FONT.family}
        fontSize={FONT.size.sm}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.regular}
        textCase="upper"
        hidden={props.time === undefined}
      >
        {props.time}
      </Text> */}

      {props.editCount >= 2 && (
        <Text
          name="Edited"
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
        >
          {`(Edited ${props.editedTime})`}
        </Text>
      )}
    </AutoLayout>
  );
};
