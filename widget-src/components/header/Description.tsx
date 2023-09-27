import { COLOR, FONT, PADDING } from '../../utilities/Styles';
import { getDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Input } = widget;

interface DescriptionProps {
  description: boolean;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
  setUpdatedDate: (updatedDate: string) => void;
}

export const Description = (props: DescriptionProps) => {
  return (
    <AutoLayout
      name="DescriptionWrapper"
      overflow="visible"
      direction="vertical"
      padding={{
        vertical: PADDING.lg,
        horizontal: 0,
      }}
      width="fill-parent"
      hidden={!props.description}
    >
      <Input
        name="Description"
        fill={COLOR.black}
        inputBehavior="multiline"
        inputFrameProps={{
          fill: COLOR.white,
        }}
        onTextEditEnd={e => {
          props.setDescriptionText(e.characters);
          props.setUpdatedDate(getDate());
        }}
        placeholder="Description..."
        value={props.descriptionText}
        width="fill-parent"
        lineHeight={FONT.lineHeight.xl}
        fontFamily="IBM Plex Sans"
        fontSize={FONT.size.lg}
        hidden={!props.description}
      />
    </AutoLayout>
  );
};
