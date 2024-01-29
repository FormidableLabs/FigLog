
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';
import { ActionLinkIcon } from '../../svgs/ActionLinkIcon';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';

const { widget, openExternal } = figma;
const { AutoLayout, Frame, SVG, Text } = widget;

interface LinkProps {
  label: string,
  url: string,
  icon?: string,
  key: string,
  deleteLink: () => void;
}

export const Link = ({
  label,
  url,
  icon = <ActionLinkIcon color={COLOR.greyDark} />,
  key,
  deleteLink,
}: LinkProps) => {

  return (
    <AutoLayout
      name={`link_${label}`}
      key={key}
    >
      <AutoLayout
        fill={COLOR.greyLight}
        onClick={ () => openExternal(url) }
        spacing={GAP.sm}
        padding={{
          vertical: PADDING.xs,
          left: PADDING.sm,
          right: PADDING.md,
        }}
        cornerRadius={{
          topLeft: RADIUS.xs,
          topRight: RADIUS.none,
          bottomRight: RADIUS.none,
          bottomLeft: RADIUS.xs,
        }}
        hoverStyle={{ fill: COLOR.grey }}
        height={SPACE.sm}
      >
        <Frame name="Icon" overflow="visible" width={SPACE.xxs} height={SPACE.xxs}>
          <SVG
            name={label}
            x={{
              type: 'center',
              offset: PADDING.none,
            }}
            y={{
              type: 'center',
              offset: PADDING.none,
            }}
            height={SPACE.xs}
            width={SPACE.xs}
            src={icon}
          />
        </Frame>
        <Text
          name="Label"
          fill={COLOR.greyDark}
          verticalAlignText="center"
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
        >
          {label}
        </Text>
      </AutoLayout>
      <AutoLayout
        name="delete link"
        onClick={() => deleteLink()}
        padding={{
          left: PADDING.sm,
          right: PADDING.sm,
        }}
        cornerRadius={{
          topLeft: RADIUS.none,
          topRight: RADIUS.xs,
          bottomRight: RADIUS.xs,
          bottomLeft: RADIUS.none,
        }}
        fill={COLOR.greyLight}
        hoverStyle={{ fill: COLOR.grey }}
        height={SPACE.sm}
        verticalAlignItems="center"
      >
        <SVG
          name="delete"
          height={SPACE.xxs}
          width={SPACE.xxs}
          src={<ActionDeleteIcon color={COLOR.greyDark} />}
        />
      </AutoLayout>
    </AutoLayout>
  )
}