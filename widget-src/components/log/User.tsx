import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Image, Rectangle, Text } = widget;

interface UserProps {
  userName: string | undefined;
  userPhotoUrl: string | null | undefined;
  showAvatars: boolean;
  isLastRow: boolean;
  isFocused: boolean;
}

export const User = ({ userName, userPhotoUrl, showAvatars, isLastRow, isFocused }: UserProps) => {
  return (
    <AutoLayout
      name="User"
      overflow="visible"
      direction="vertical"
      spacing={GAP.none}
      padding={{
        top: PADDING.xl,
        right: showAvatars ? PADDING.none : PADDING.sm,
        bottom: isLastRow ? PADDING.none : PADDING.xl,
        left: PADDING.none,
      }}
      height="fill-parent"
      horizontalAlignItems="center"
    >
      {showAvatars && (
        <AutoLayout name="Avatar" overflow="visible" spacing={GAP.sm} verticalAlignItems="center">
          {userPhotoUrl ? (
            <Image name="UserImage" cornerRadius={RADIUS.lg} width={SPACE.sm} height={SPACE.sm} src={userPhotoUrl} />
          ) : (
            <Rectangle
              name="Placeholder"
              fill={COLOR.grey}
              cornerRadius={RADIUS.lg}
              width={SPACE.sm}
              height={SPACE.sm}
            />
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
      )}
      <Rectangle
        name="Divider"
        fill={!!isFocused ? COLOR.greyDark : COLOR.grey}
        cornerRadius={{
          topLeft: showAvatars ? RADIUS.none : RADIUS.md,
          topRight: showAvatars ? RADIUS.none : RADIUS.md,
          bottomRight: RADIUS.md,
          bottomLeft: RADIUS.md,
        }}
        width={SPACE.one}
        height="fill-parent"
      />
    </AutoLayout>
  );
};
