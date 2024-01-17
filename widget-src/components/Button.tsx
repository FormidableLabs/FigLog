import { ActionEditIcon } from '../svgs/ActionEditIcon';
import { ActionDeleteIcon } from '../svgs/ActionDeleteIcon';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Frame, SVG, Text } = widget;

interface ButtonProps {
  label: string;
  hideLabel?: boolean;
  action: () => void;
  iconSrc?: string;
}

export const Button = ({
  label,
  hideLabel = false,
  action,
  iconSrc
}: ButtonProps) => {

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
      spacing={GAP.sm}
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
            height={SPACE.xxs}
            width={SPACE.xxs}
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
