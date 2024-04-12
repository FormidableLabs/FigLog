import { COLOR, FONT, PADDING } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface DescriptionProps {
  description: boolean;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
  locked: boolean;
}

export const Description = ({
  description,
  descriptionText,
  setDescriptionText,
  setUpdatedDate,
  locked,
}: DescriptionProps) => {
  return (
    <AutoLayout
      name="DescriptionWrapper"
      overflow="visible"
      direction="vertical"
      padding={{
        vertical: PADDING.lg,
        horizontal: PADDING.none,
      }}
      width="fill-parent"
      hidden={!description}
    >
      {locked ? (
        <Text
          name="Description"
          fill={!!descriptionText ? COLOR.black : COLOR.grey}
          width="fill-parent"
          lineHeight={FONT.lineHeight.xl}
          fontFamily={FONT.family}
          fontSize={FONT.size.lg}
          hidden={!description}
        >
          {descriptionText || "Description..."}
        </Text>
      ) : (
        <Input
          name="Description"
          fill={COLOR.black}
          inputBehavior="multiline"
          inputFrameProps={{
            fill: COLOR.white,
          }}
          onTextEditEnd={e => {
            setDescriptionText(e.characters);
            setUpdatedDate(Date.now());
          }}
          placeholder="Description..."
          value={descriptionText}
          width="fill-parent"
          lineHeight={FONT.lineHeight.xl}
          fontFamily={FONT.family}
          fontSize={FONT.size.lg}
          hidden={!description}
        />

      )}
    </AutoLayout>
  );
};
