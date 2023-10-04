import { COLOR, FONT } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input } = widget;

interface NameProps {
  name: boolean;
  nameText: string;
  setNameText: (name: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
}

export const Name = (props: NameProps) => {
  return (
    <AutoLayout name="NameWrapper" overflow="visible" direction="vertical" width="fill-parent" hidden={!props.name}>
      <Input
        name="Name"
        fill={COLOR.black}
        width="fill-parent"
        lineHeight={FONT.lineHeight.xxl}
        fontFamily="IBM Plex Sans"
        fontSize={FONT.size.xxl}
        fontWeight={FONT.weight.bold}
        inputFrameProps={{
          fill: COLOR.white,
        }}
        onTextEditEnd={e => {
          props.setNameText(e.characters);
          props.setUpdatedDate(Date.now());
        }}
        placeholder="Name..."
        value={props.nameText}
        hidden={!props.name}
      />
    </AutoLayout>
  );
};
