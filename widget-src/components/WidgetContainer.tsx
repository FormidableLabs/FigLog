const { widget } = figma;
const {
  AutoLayout
} = widget;

interface WidgetContainerProps {
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[];
}

export const WidgetContainer = (props: WidgetContainerProps) => (
  <AutoLayout
    name="Widget"
    fill="#FFF"
    cornerRadius={16}
    overflow="visible"
    direction="vertical"
    padding={{
      vertical: 32,
      horizontal: 24,
    }}
    width={800}
  >
    {props.children}
  </AutoLayout>
);
