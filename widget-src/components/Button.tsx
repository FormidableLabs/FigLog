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

export const Button = (props: ButtonProps) => {
  let svgSrc = '';
  switch (props.label) {
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
        props.action();
      }}
      spacing={GAP.sm}
      padding={PADDING.xs}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      {...props}
    >
      <Frame name="Icon" overflow="visible" width={SPACE.xxs} height={SPACE.xxs} {...props}>
        <SVG
          name={props.label}
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
        hidden={props.hideLabel}
      >
        {props.label}
      </Text>
    </AutoLayout>
  );
};
