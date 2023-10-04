import { COLOR, FONT, GAP, PADDING, SPACE } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface MetaValueProps {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  setUpdatedDate?: (updatedDate: number) => void;
}

export const MetaValue = (props: MetaValueProps) => {
  return (
    <AutoLayout
      name="MetaValue"
      overflow="visible"
      spacing={GAP.md}
      padding={{
        vertical: PADDING.xxs,
        horizontal: PADDING.none,
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
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          inputFrameProps={{
            fill: COLOR.white,
          }}
          onTextEditEnd={e => {
            props.setValue ? props.setValue(e.characters) : null;
            props.setUpdatedDate ? props.setUpdatedDate(Date.now()) : null;
          }}
          placeholder="0.0.0"
          value={props.value}
          width={SPACE.md}
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
