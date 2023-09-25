const { widget } = figma;
const { AutoLayout, Text } = widget;

interface LogDateProps {
  date: string;
  edited?: boolean;
}

export const LogDate = (props: LogDateProps) => {
  return (
    <AutoLayout name="LogDate" overflow="visible" spacing={8} verticalAlignItems="center" {...props}>
      <Text
        name="August 16, 2023"
        fill="#2F2D2E"
        lineHeight={16}
        fontFamily="IBM Plex Sans"
        fontSize={12}
        letterSpacing={0.48}
        fontWeight={700}
        textCase="upper"
      >
        {props.date}
      </Text>
      {props.edited && (
        <Text
          name="Edited"
          fill="#676D75"
          lineHeight={16}
          fontFamily="IBM Plex Sans"
          fontSize={12}
          letterSpacing={0.48}
          textCase="upper"
        >
          Edited
        </Text>
      )}
    </AutoLayout>
  );
};
