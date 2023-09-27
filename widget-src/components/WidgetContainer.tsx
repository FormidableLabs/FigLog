import { COLOR, RADIUS, PADDING, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout } = widget;

interface WidgetContainerProps {
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[];
}

export const WidgetContainer = (props: WidgetContainerProps) => (
  <AutoLayout
    name="Widget"
    fill={COLOR.white}
    cornerRadius={RADIUS.lg}
    overflow="visible"
    direction="vertical"
    stroke={COLOR.grey}
    padding={{
      vertical: PADDING.xl,
      horizontal: PADDING.xl,
    }}
    width={SPACE.xxl}
  >
    {props.children}
  </AutoLayout>
);
