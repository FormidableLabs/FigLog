const { widget } = figma;
const { AutoLayout, Input, Rectangle, SVG, Text } = widget;

interface StatusProps {
  status: StatusType;
}

export const Status = (props: StatusProps) => {
  return (
    <AutoLayout
      name="Status"
      fill="#EBE5DA"
      cornerRadius={2}
      overflow="visible"
      spacing={4}
      padding={{
        vertical: 4,
        horizontal: 8,
      }}
      verticalAlignItems="center"
    >
      <Text
        name="Label"
        fill="#2F2D2E"
        verticalAlignText="center"
        lineHeight={16}
        fontFamily="IBM Plex Sans"
        fontSize={12}
        letterSpacing={0.48}
        fontWeight={700}
        textCase="upper"
      >
        {STATUS_TYPE_DISPLAY_NAMES[props.status]}
      </Text>
    </AutoLayout>
  );
};
