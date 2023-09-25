const { widget } = figma;
const { AutoLayout, Image, Rectangle, Text } = widget;

interface UserProps {
  userName: string | undefined;
  userPhotoUrl: string | null | undefined;
}

export const User = (props: UserProps) => {
  return (
    <AutoLayout
      name="User"
      overflow="visible"
      direction="vertical"
      spacing={0}
      padding={{
        vertical: 24,
        horizontal: 0,
      }}
      height="fill-parent"
      horizontalAlignItems="center"
      {...props}
    >
      <AutoLayout name="Avatar" overflow="visible" spacing={8} verticalAlignItems="center" {...props}>
        {props.userPhotoUrl ? (
          <Image name="UserImage" cornerRadius={8} width={24} height={24} src={props.userPhotoUrl} />
        ) : (
          <Rectangle name="Placeholder" fill="#E6E6E6" cornerRadius={8} width={24} height={24} />
        )}
        <Text
          name="UserName"
          hidden={true}
          fill="#2F2D2E"
          lineHeight={16}
          fontFamily="IBM Plex Sans"
          fontSize={12}
          letterSpacing={0.48}
          textCase="upper"
        >
          {props.userName || 'Unknown User'}
        </Text>
      </AutoLayout>
      <Rectangle
        name="Divider"
        fill="#E6E6E6"
        cornerRadius={{
          topLeft: 0,
          topRight: 0,
          bottomRight: 8,
          bottomLeft: 8,
        }}
        width={1}
        height="fill-parent"
      />
    </AutoLayout>
  );
};
