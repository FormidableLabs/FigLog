import { COLOR, FONT } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface NameProps {
  name: boolean;
  nameText: string;
  setNameText: (name: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
  locked: boolean;
}

export const Name = ({ name, nameText, setNameText, setUpdatedDate, locked }: NameProps) => {
  return (
    <AutoLayout name="NameWrapper" overflow="visible" direction="vertical" width="fill-parent" hidden={!name}>
      {locked ? (
        <Text
          name="Name"
          width="fill-parent"
          fill={!!nameText ? COLOR.black : COLOR.grey}
          lineHeight={FONT.lineHeight.xxl}
          fontFamily={FONT.family}
          fontSize={FONT.size.xxl}
          fontWeight={FONT.weight.bold}
          hidden={!name}
        >
          {nameText || 'Name...'}
        </Text>
      ) : (
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
      )}
    </AutoLayout>
  );
};
