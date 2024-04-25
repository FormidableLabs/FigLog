import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Frame, SVG, Text } = widget;

interface ButtonProps {
  label: string;
  hideLabel?: boolean;
  action: () => void;
  iconSrc?: string;
  error?: boolean;
}

export const Button = ({ label, hideLabel = false, action, iconSrc, error = false }: ButtonProps) => {
  if (error) {
    return (
      <AutoLayout
        name={`error-button-${label}`}
        fill={COLOR.white}
        cornerRadius={RADIUS.sm}
        overflow="visible"
        spacing={GAP.xs}
        padding={PADDING.xs}
        stroke={COLOR.red}
        strokeWidth={SPACE.one}
        horizontalAlignItems="center"
        verticalAlignItems="center"
      >
        {iconSrc && (
          <Frame name="Icon" overflow="visible" width={SPACE.xxs} height={SPACE.xxs}>
            <SVG
              name={label}
              x={{
                type: 'center',
                offset: PADDING.none,
              }}
              y={{
                type: 'center',
                offset: PADDING.none,
              }}
              height={SPACE.xs}
              width={SPACE.xs}
              src={iconSrc}
            />
          </Frame>
        )}
        <Text
          name="Label"
          fill={COLOR.red}
          verticalAlignText="center"
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
          hidden={hideLabel}
        >
          {label}
        </Text>
      </AutoLayout>
    );
  }

  return (
    <AutoLayout
      name={`button-${label}`}
      fill={COLOR.white}
      cornerRadius={RADIUS.sm}
      overflow="visible"
      hoverStyle={{ fill: COLOR.grey }}
      onClick={() => {
        action();
      }}
      spacing={GAP.xs}
      padding={PADDING.xs}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      {iconSrc && (
        <Frame name="Icon" overflow="visible" width={SPACE.xxs} height={SPACE.xxs}>
          <SVG
            name={label}
            x={{
              type: 'center',
              offset: PADDING.none,
            }}
            y={{
              type: 'center',
              offset: PADDING.none,
            }}
            height={SPACE.xs}
            width={SPACE.xs}
            src={iconSrc}
          />
        </Frame>
      )}
      <Text
        name="Label"
        fill={COLOR.greyDark}
        verticalAlignText="center"
        lineHeight={FONT.lineHeight.xs}
        fontFamily={FONT.family}
        fontSize={FONT.size.xs}
        letterSpacing={FONT.letterSpacing.sm}
        fontWeight={FONT.weight.bold}
        textCase="upper"
        hidden={hideLabel}
      >
        {label}
      </Text>
    </AutoLayout>
  );
};
