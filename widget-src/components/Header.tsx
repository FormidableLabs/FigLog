const { widget } = figma;
const {
  AutoLayout,
  Input,
  Rectangle,
  SVG,
  Text
} = widget;

interface HeaderProps {
  name: boolean;
  description: boolean;
  nameText: string;
  setNameText: (name: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
  status: number;
  currentDate: string;
}

export const Header = (props: HeaderProps) => (
  <AutoLayout name="Header" overflow="visible" direction="vertical" spacing={8} width="fill-parent">
    <AutoLayout name="Container" overflow="visible" direction="vertical" width="fill-parent">
      <Text
        name="Change log"
        fill="#888"
        lineHeight={24}
        fontFamily="IBM Plex Sans"
        fontSize={20}
        textCase="upper"
      >
        Change log
      </Text>
      {/* NAME */}
      <AutoLayout
        name="Name Wrapper"
        overflow="visible"
        direction="vertical"
        width="fill-parent"
        hidden={!props.name}
      >
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
          onTextEditEnd={(e) => {
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
        name="Description Wrapper"
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
          onTextEditEnd={(e) => {
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
        name="Meta"
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
        {/* STATUS */}
        <AutoLayout
          name="Status"
          overflow="visible"
          spacing={8}
          verticalAlignItems="center"
          hidden={props.status === 0}
        >
          <Text
            name="Status"
            fill="#525252"
            lineHeight={12}
            fontFamily="IBM Plex Sans"
            fontSize={10}
            letterSpacing={0.4}
            fontWeight={600}
            textCase="upper"
          >
            Status
          </Text>
          <AutoLayout
            name="Tag"
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
              fill="#525252"
              verticalAlignText="center"
              horizontalAlignText="center"
              lineHeight={12}
              fontFamily="IBM Plex Sans"
              fontSize={10}
              letterSpacing={0.4}
              fontWeight={700}
              textCase="upper"
            >
              ✅ Released
            </Text>
          </AutoLayout>
        </AutoLayout>
        {/* NEW */}
        <AutoLayout
          name="NewAction"
          overflow="visible"
          width={'fill-parent'}
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <AutoLayout
            name="New Button"
            strokeWidth={0.31}
            onClick={() => {
              console.log('clicked');

              // setCount(count + 1)
              // addChange();
            }}
            overflow="visible"
            spacing={8}
            padding={2}
            horizontalAlignItems="end"
            verticalAlignItems="center"
          >
            <SVG
              name="Vector"
              height={16}
              width={16}
              src="<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M16 7.30435H8.69565V0H7.30435V7.30435H0V8.69565H7.30435V16H8.69565V8.69565H16V7.30435Z' fill='black'/>
    </svg>
    "
            />
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
    <Rectangle name="Divider" fill="#000" strokeAlign="outside" width="fill-parent" height={1} />
  </AutoLayout>
);
