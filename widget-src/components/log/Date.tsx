import { COLOR, FONT, GAP } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface DateProps {
  date: string;
  time: string;
  editCount: number;
  edited?: boolean;
}

export const Date = (props: DateProps) => {
  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.md} verticalAlignItems="center" {...props}>
      <Text
        name="Date"
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
      <Text
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
      </Text>
      {props.editCount >= 2 && (
        <Text
          name="Edited"
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          textCase="upper"
        >
          Edited
        </Text>
      )}
    </AutoLayout>
  );
};
