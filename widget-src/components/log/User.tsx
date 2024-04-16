import { COLOR, FONT, GAP, RADIUS, PADDING, SPACE } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Image, Rectangle, Text } = widget;

interface UserProps {
  userName: string | undefined;
  userPhotoUrl: string | null | undefined;
}

export const User = ({ userName, userPhotoUrl }: UserProps) => {
  return (
    <AutoLayout
      name="User"
      overflow="visible"
      direction="vertical"
      spacing={GAP.none}
      padding={{
        vertical: PADDING.xl,
        horizontal: PADDING.none,
      }}
      height="fill-parent"
      horizontalAlignItems="center"
    >
      <AutoLayout name="Avatar" overflow="visible" spacing={GAP.md} verticalAlignItems="center">
        {userPhotoUrl ? (
          <Image name="UserImage" cornerRadius={RADIUS.lg} width={SPACE.sm} height={SPACE.sm} src={userPhotoUrl} />
        ) : (
          <Rectangle name="Placeholder" fill={COLOR.grey} cornerRadius={RADIUS.lg} width={SPACE.sm} height={SPACE.sm} />
        )}
        <Text
          name="UserName"
          hidden={true}
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          textCase="upper"
        >
          {userName || 'Unknown User'}
        </Text>
      </AutoLayout>
      <Rectangle
        name="Divider"
        fill={COLOR.grey}
        cornerRadius={{
          topLeft: RADIUS.none,
          topRight: RADIUS.none,
          bottomRight: RADIUS.md,
          bottomLeft: RADIUS.md,
        }}
        width={SPACE.one}
        height="fill-parent"
      />
    </AutoLayout>
  );
};
