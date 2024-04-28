import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface InputFieldProps {
  name: string;
  action: (val: string) => void;
  placeholder?: string;
  value?: string;
  large?: boolean;
  isRequired?: boolean;
  behavior?: 'truncate' | 'multiline' | 'wrap';
  textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced';
  isAbsolutePos?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  errorPosition?: 'left' | 'right';
  letterSpacing?: string | number;
  fontWeight?: WidgetJSX.FontWeight;
  width?: WidgetJSX.Size;
}

export const InputField = ({
  name,
  action,
  placeholder,
  value,
  large = false,
  isRequired = false,
  behavior,
  textCase = 'original',
  isAbsolutePos = false,
  hasError = false,
  errorMessage,
  errorPosition,
  letterSpacing,
  fontWeight,
  width = 'fill-parent',
}: InputFieldProps) => {
  return (
    <AutoLayout
      name="Input Wrapper"
      overflow="visible"
      direction="vertical"
      spacing={GAP.xs}
      width={width || undefined}
    >
      <Input
        name={name}
        fill={COLOR.black}
        inputBehavior={behavior || undefined}
        inputFrameProps={{
          fill: COLOR.white,
          stroke: hasError ? COLOR.red : COLOR.grey,
          strokeWidth: SPACE.one,
          cornerRadius: RADIUS.xs,
          padding: { horizontal: large ? PADDING.xs : PADDING.xxs, vertical: large ? PADDING.xs : PADDING.xxs },
        }}
        width={width || undefined}
        placeholder={placeholder || ''}
        value={value || ''}
        fontFamily={FONT.family}
        fontSize={large ? FONT.size.md : FONT.size.sm}
        fontWeight={fontWeight || undefined}
        letterSpacing={letterSpacing || undefined}
        lineHeight={large ? FONT.lineHeight.lg : FONT.lineHeight.sm}
        textCase={textCase || undefined}
        onTextEditEnd={e => {
          const trimmedInput = e.characters.trim();
          action(trimmedInput);
        }}
      />
      {isRequired &&
        (isAbsolutePos ? (
          <Text
            fill={COLOR.red}
            fontSize={FONT.size.xs}
            fontFamily={FONT.family}
            positioning={'absolute'}
            horizontalAlignText={errorPosition}
            y={{ type: 'top', offset: PADDING.xl + 4 }}
            x={errorPosition === 'right' ? { type: 'right', offset: 0 } : { type: 'left', offset: 0 }}
          >
            {hasError ? errorMessage : ''}
          </Text>
        ) : (
          <Text fill={COLOR.red} fontSize={FONT.size.xs} fontFamily={FONT.family}>
            {hasError ? errorMessage : ''}
          </Text>
        ))}
    </AutoLayout>
  );
};
