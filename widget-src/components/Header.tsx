import { randomId } from '../utilities/Utils';
import { ActionAddIcon } from '../svgs/ActionAddIcon';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, SVG, Text } = widget;

interface HeaderProps {
  name: boolean;
  description: boolean;
  nameText: string;
  setNameText: (name: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
  status: string;
  currentDate: string;
  addChange: (changeId: string) => void;
}

export const Header = (props: HeaderProps) => {
  console.log(props.status);
  let statusText = '';
  switch (props.status) {
    case '1':
      statusText = '🙋‍♀️ Proposed';
      break;
    case '2':
      statusText = '🚧 Draft';
      break;
    case '3':
      statusText = '🧑‍🚀 Beta';
      break;
    case '4':
      statusText = '✅ Released';
      break;
    case '5':
      statusText = '🧊 Depreciated';
      break;
    case '6':
      statusText = '🚨 Archived';
      break;
    default:
      statusText = '';
      break;
  }
  return (
    <AutoLayout name="Header" overflow="visible" direction="vertical" spacing={8} width="fill-parent">
      <AutoLayout name="Container" overflow="visible" direction="vertical" width="fill-parent">
        {/* STATUS */}
        {statusText !== '' && (
          <AutoLayout
            name="StatusWrapper"
            overflow="visible"
            direction="vertical"
            padding={{
              top: 0,
              right: 0,
              bottom: 8,
              left: 0,
            }}
            width={'fill-parent'}
          >
            <AutoLayout
              name="Status"
              fill="#EBE5DA"
              cornerRadius={2}
              overflow="visible"
              spacing={4}
              padding={{
                vertical: 4,
                horizontal: 8,
              }}
              verticalAlignItems="center"
            >
              <Text
                name="Label"
                fill="#2F2D2E"
                verticalAlignText="center"
                lineHeight={16}
                fontFamily="IBM Plex Sans"
                fontSize={12}
                letterSpacing={0.48}
                fontWeight={700}
                textCase="upper"
              >
                {statusText}
              </Text>
            </AutoLayout>
          </AutoLayout>
        )}
        {/* NAME */}
        <AutoLayout name="NameWrapper" overflow="visible" direction="vertical" width="fill-parent" hidden={!props.name}>
          <Input
            name="Name"
            fill="#000"
            width="fill-parent"
            lineHeight={44}
            fontFamily="IBM Plex Sans"
            fontSize={40}
            fontWeight={700}
            inputFrameProps={{
              fill: '#FFF',
            }}
            onTextEditEnd={e => {
              props.setNameText(e.characters);
            }}
            placeholder="Name..."
            value={props.nameText}
            textCase="upper"
            hidden={!props.name}
          />
        </AutoLayout>
        {/* DESCRIPTION */}
        <AutoLayout
          name="DescriptionWrapper"
          overflow="visible"
          direction="vertical"
          padding={{
            vertical: 16,
            horizontal: 0,
          }}
          width="fill-parent"
          hidden={!props.description}
        >
          <Input
            name="Description"
            fill="#000"
            inputBehavior="multiline"
            inputFrameProps={{
              fill: '#FFF',
            }}
            onTextEditEnd={e => {
              props.setDescriptionText(e.characters);
            }}
            placeholder="Description..."
            value={props.descriptionText}
            width="fill-parent"
            lineHeight={28}
            fontFamily="IBM Plex Sans"
            fontSize={18}
            hidden={!props.description}
          />
        </AutoLayout>
        {/* META */}
        <AutoLayout
          name="MetaWrapper"
          overflow="visible"
          spacing={32}
          padding={{
            top: 8,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          width="fill-parent"
          verticalAlignItems="center"
        >
          {/* CREATED */}
          <AutoLayout
            name="Created"
            overflow="visible"
            spacing={8}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            verticalAlignItems="center"
          >
            <Text
              name="Logging since"
              fill="#525252"
              lineHeight={12}
              fontFamily="IBM Plex Sans"
              fontSize={10}
              letterSpacing={0.4}
              fontWeight={600}
              textCase="upper"
            >
              Logging since
            </Text>
            <Text
              name="08|16|23"
              fill="#888"
              lineHeight={12}
              fontFamily="IBM Plex Sans"
              fontSize={10}
              letterSpacing={0.4}
            >
              {props.currentDate}
            </Text>
          </AutoLayout>
          {/* UPDATED */}
          <AutoLayout
            name="Updated"
            overflow="visible"
            spacing={8}
            padding={{
              vertical: 4,
              horizontal: 0,
            }}
            verticalAlignItems="center"
          >
            <Text
              name="Last Updated"
              fill="#525252"
              lineHeight={12}
              fontFamily="IBM Plex Sans"
              fontSize={10}
              letterSpacing={0.4}
              fontWeight={600}
              textCase="upper"
            >
              Last Updated
            </Text>
            <Text
              name="08|16|23"
              fill="#888"
              lineHeight={12}
              fontFamily="IBM Plex Sans"
              fontSize={10}
              letterSpacing={0.4}
            >
              {props.currentDate}
            </Text>
          </AutoLayout>
          {/* NEW */}
          <AutoLayout
            name="Actions"
            overflow="visible"
            width={'fill-parent'}
            horizontalAlignItems="end"
            verticalAlignItems="center"
          >
            <AutoLayout
              name="NewLog"
              strokeWidth={0.31}
              cornerRadius={4}
              fill={'#FFF'}
              hoverStyle={{ fill: '#E6E6E6' }}
              onClick={() => {
                const changeId = randomId();
                props.addChange(changeId);
                figma.notify('New change added');
              }}
              overflow="visible"
              spacing={8}
              padding={8}
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              <SVG name="Vector" height={16} width={16} src={ActionAddIcon} />
            </AutoLayout>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
      <Rectangle name="Divider" fill="#000" strokeAlign="outside" width="fill-parent" height={1} />
    </AutoLayout>
  );
};
