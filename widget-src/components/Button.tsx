import { ActionEditIcon } from '../svgs/ActionEditIcon';
import { ActionDeleteIcon } from '../svgs/ActionDeleteIcon';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Frame, SVG, Text } = widget;

interface ButtonProps {
  label: string;
  hideLabel: boolean;
  action: () => void;
}

export const Button = ({
  label,
  hideLabel,
  action,
}: ButtonProps) => {
  let svgSrc = '';
  switch (label) {
    case 'Edit':
      svgSrc = ActionEditIcon;
      break;
    case 'Delete':
      svgSrc = ActionDeleteIcon;
      break;
    default:
      break;
  }

  return (
    <AutoLayout
      name="Button"
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
          src={svgSrc}
        />
      </Frame>
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
