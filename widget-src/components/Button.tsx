import { ActionEditIcon } from '../svgs/ActionEditIcon';
import { ActionDeleteIcon } from '../svgs/ActionDeleteIcon';

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
      fill="#FFF"
      cornerRadius={4}
      overflow="visible"
      hoverStyle={{ fill: '#E6E6E6' }}
      onClick={() => {
        props.action();
      }}
      spacing={4}
      padding={6}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      {...props}
    >
      <Frame name="Icon" overflow="visible" width={12} height={12} {...props}>
        <SVG
          name={props.label}
          x={{
            type: 'center',
            offset: 0,
          }}
          y={{
            type: 'center',
            offset: 0,
          }}
          height={12}
          width={12}
          src={svgSrc}
        />
      </Frame>
      <Text
        name="Label"
        fill="#676D75"
        verticalAlignText="center"
        lineHeight={12}
        fontFamily="IBM Plex Sans Condensed"
        fontSize={10}
        letterSpacing={0.4}
        fontWeight={700}
        textCase="upper"
        hidden={props.hideLabel}
      >
        {props.label}
      </Text>
    </AutoLayout>
  );
};
