import { COLOR, FONT } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input } = widget;

interface NameProps {
  name: boolean;
  nameText: string;
  setNameText: (name: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
}

export const Name = ({
  name,
  nameText,
  setNameText,
  setUpdatedDate,
}: NameProps) => {
  return (
    <AutoLayout name="NameWrapper" overflow="visible" direction="vertical" width="fill-parent" hidden={!name}>
      <Input
        name="Name"
        fill={COLOR.black}
        width="fill-parent"
        lineHeight={FONT.lineHeight.xxl}
        fontFamily={FONT.family}
        fontSize={FONT.size.xxl}
        fontWeight={FONT.weight.bold}
        inputFrameProps={{
          fill: COLOR.white,
        }}
        onTextEditEnd={e => {
          setNameText(e.characters);
          setUpdatedDate(Date.now());
        }}
        placeholder="Name..."
        value={nameText}
        hidden={!name}
      />
    </AutoLayout>
  );
};
