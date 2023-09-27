import { COLOR, FONT, GAP, RADIUS, PADDING } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface StatusProps {
  status: string;
}

export const Status = (props: StatusProps) => {
  let statusEmoji = '';
  let statusLabel = '';
  switch (props.status) {
    case '1':
      statusEmoji = '🙋‍♀️';
      statusLabel = 'Proposed';
      break;
    case '2':
      statusEmoji = '🚧';
      statusLabel = 'Draft';
      break;
    case '3':
      statusEmoji = '🧑‍🚀';
      statusLabel = 'Beta';
      break;
    case '4':
      statusEmoji = '✅';
      statusLabel = 'Released';
      break;
    case '5':
      statusEmoji = '🧊';
      statusLabel = 'Depreciated';
      break;
    case '6':
      statusEmoji = '🚨';
      statusLabel = 'Archived';
      break;
    default:
      statusEmoji = '';
      statusLabel = '';
      break;
  }

  return (
    <AutoLayout
      name="StatusWrapper"
      overflow="visible"
      direction="vertical"
      padding={{
        top: 0,
        right: 0,
        bottom: PADDING.lg,
        left: 0,
      }}
      width={'fill-parent'}
    >
      <AutoLayout
        name="Status"
        fill={COLOR.tan}
        cornerRadius={RADIUS.sm}
        overflow="visible"
        spacing={GAP.md}
        padding={{
          vertical: PADDING.sm,
          horizontal: PADDING.md,
        }}
        verticalAlignItems="center"
      >
        <Text
          name="Emoji"
          fill={COLOR.black}
          verticalAlignText="center"
          lineHeight={FONT.lineHeight.md}
          fontFamily={FONT.family}
          fontSize={FONT.size.xl}
          letterSpacing={FONT.letterSpacing.lg}
          fontWeight={FONT.weight.bold}
          textCase="upper"
        >
          {statusEmoji}
        </Text>
        <Text
          name="Label"
          fill={COLOR.black}
          verticalAlignText="center"
          lineHeight={FONT.lineHeight.md}
          fontFamily={FONT.family}
          fontSize={FONT.size.md}
          letterSpacing={FONT.letterSpacing.lg}
          fontWeight={FONT.weight.bold}
          textCase="upper"
        >
          {statusLabel}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};
