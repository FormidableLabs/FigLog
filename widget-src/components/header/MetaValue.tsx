import { COLOR, FONT, GAP, PADDING, SPACE } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface MetaValueProps {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  setUpdatedDate?: (updatedDate: number) => void;
  locked: boolean;
}

export const MetaValue = ({
  label,
  value,
  setValue,
  setUpdatedDate,
  locked,
}: MetaValueProps) => {
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
        {label}
      </Text>
      {setValue && setUpdatedDate && !locked ? (
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
            if (e.characters !== value) {
              setValue ? setValue(e.characters) : null;
              setUpdatedDate ? setUpdatedDate(Date.now()) : null;
            }
          }}
          placeholder="0.0.0"
          value={value}
          width={SPACE.md}
          inputBehavior="truncate"
          truncate={0}
        />
      ) : (
        <Text
          name="MetaValueValue"
          fill={!!value ? COLOR.greyDark : COLOR.grey}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
          width={'hug-contents'}
        >
          {value || '0.0.0'}
        </Text>
      )}
    </AutoLayout>
  );
};
