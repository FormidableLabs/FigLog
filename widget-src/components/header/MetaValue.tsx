import { COLOR, FONT, GAP, PADDING } from '../../utilities/Styles';
import { getDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface MetaValueProps {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  setUpdatedDate?: (updatedDate: string) => void;
}

export const MetaValue = (props: MetaValueProps) => {
  return (
    <AutoLayout
      name="MetaValue"
      overflow="visible"
      spacing={GAP.md}
      padding={{
        vertical: PADDING.xxs,
        horizontal: 0,
      }}
      verticalAlignItems="center"
    >
      <Text
        name="MetaValueLabel"
        fill={COLOR.black}
        lineHeight={FONT.lineHeight.xs}
        fontFamily={FONT.family}
        fontSize={FONT.size.xs}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.bold}
        textCase="upper"
      >
        {props.label}
      </Text>
      {props.setValue && props.setUpdatedDate ? (
        <Input
          name="EditableMetaValueValue"
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          inputFrameProps={{
            fill: COLOR.white,
          }}
          onTextEditEnd={e => {
            props.setValue ? props.setValue(e.characters) : null;
            props.setUpdatedDate ? props.setUpdatedDate(getDate()) : null;
          }}
          placeholder="0.0.0"
          value={props.value}
          width={60}
          inputBehavior="truncate"
          truncate={0}
        />
      ) : (
        <Text
          name="MetaValueValue"
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
          width={'hug-contents'}
        >
          {props.value}
        </Text>
      )}
    </AutoLayout>
  );
};
