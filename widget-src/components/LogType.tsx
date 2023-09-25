const { widget } = figma;
const { AutoLayout, Text } = widget;

interface LogTypeProps {
  type: 'Added' | 'Breaking' | 'Changed' | 'Deprecated' | 'Fixed' | 'Other' | 'Removed';
}

export const LogType = (props: LogTypeProps) => {
  let txColor = '#FFFFFF';
  let bgColor = '#2F2D2E';
  switch (props.type) {
    case 'Added':
      bgColor = '#99C24D';
      break;
    case 'Breaking':
      bgColor = '#C34C4E';
      break;
    case 'Changed':
      bgColor = '#7F2982';
      break;
    case 'Deprecated':
      bgColor = '#F18F01';
      break;
    case 'Fixed':
      bgColor = '#0077B6';
      break;
    case 'Other':
      txColor = '#2F2D2E';
      bgColor = '#E6E6E6';
      break;
    case 'Removed':
      bgColor = '#2F2D2E';
      break;
    default:
      break;
  }
  return (
    <AutoLayout
      name="LogType"
      fill={bgColor}
      cornerRadius={16}
      padding={{
        vertical: 6,
        horizontal: 12,
      }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
      {...props}
    >
      <Text
        name="Depreciated"
        fill={txColor}
        verticalAlignText="center"
        horizontalAlignText="center"
        lineHeight={12}
        fontFamily="IBM Plex Sans Condensed"
        fontSize={10}
        letterSpacing={0.4}
        fontWeight={700}
        textCase="upper"
      >
        {props.type}
      </Text>
    </AutoLayout>
  );
};
