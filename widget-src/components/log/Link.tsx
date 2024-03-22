
import { BrandFigmaIcon } from '../../svgs/BrandFigmaIcon';
import { BrandAsanaIcon } from '../../svgs/BrandAsanaIcon';
import { BrandBitbucketIcon } from '../../svgs/BrandBitbucketIcon';
import { BrandGithubIcon } from '../../svgs/BrandGithubIcon';
import { BrandGitlabIcon } from '../../svgs/BrandGitlabIcon';
import { BrandAtlassianIcon } from '../../svgs/BrandAtlassianIcon';
import { BrandNotionIcon } from '../../svgs/BrandNotionIcon';
import { BrandStorybookIcon } from '../../svgs/BrandStorybookIcon';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';
import { ActionLinkIcon } from '../../svgs/ActionLinkIcon';
import { FileHistory } from '../../svgs/FileHistory';
import { BrandGoogleIcon } from '../../svgs/BrandGoogleIcon';
import { BrandTrelloIcon } from '../../svgs/BrandTrelloIcon';
import { Prototype } from '../../svgs/Prototype';
import { BrandCodePenIcon } from '../../svgs/BrandCodePen';
import { BrandCodeSandboxIcon } from '../../svgs/BrandCodeSandbox';
import { BrandFramerIcon } from '../../svgs/BrandFramer';
import { BrandSlackIcon } from '../../svgs/BrandSlack';
import { BrandBasecampIcon } from '../../svgs/BrandBasecampIcon';
import { BrandChatGptIcon } from '../../svgs/BrandChatGptIcon';
import { BrandClickUpIcon } from '../../svgs/BrandClickUpIcon';
import { BrandMiroIcon } from '../../svgs/BrandMiroIcon';
import { BrandMondayIcon } from '../../svgs/BrandMondayIcon';
import { BrandMuralIcon } from '../../svgs/BrandMuralIcon';
import { BrandSmartsheetIcon } from '../../svgs/BrandSmartsheetIcon';
import { BrandTeamsIcon } from '../../svgs/BrandTeamsIcon';
import { BrandMicrosoftIcon } from '../../svgs/BrandMicrosoftIcon';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';

const { widget, openExternal } = figma;
const { AutoLayout, Frame, SVG, Text } = widget;

interface LinkProps {
  label: string,
  url: string,
  icon?: string,
  key: string,
  editing: boolean,
  deleteLink: () => void;
}

export const Link = ({
  label,
  url,
  icon = <ActionLinkIcon color={COLOR.greyDark} />,
  key,
  editing = false,
  deleteLink,
}: LinkProps) => {

  const assignSvg = (iconString: string) => {
    switch (iconString) {
      case "figmaVersion":
        return <FileHistory color={COLOR.greyDark} />;
      case "figmaPrototype":
        return <Prototype color={COLOR.greyDark} />;
      case "figma":
        return <BrandFigmaIcon color={COLOR.greyDark} />;
      case "asana":
        return <BrandAsanaIcon color={COLOR.greyDark} />;
      case "atlassian":
        return <BrandAtlassianIcon color={COLOR.greyDark} />;
      case "basecamp":
        return <BrandBasecampIcon color={COLOR.greyDark} />;
      case "bitbucket":
        return <BrandBitbucketIcon color={COLOR.greyDark} />;
      case "chatgpt":
        return <BrandChatGptIcon color={COLOR.greyDark} />;
      case "clickup":
        return <BrandClickUpIcon color={COLOR.greyDark} />;
      case "codepen":
        return <BrandCodePenIcon color={COLOR.greyDark} />;
      case "codesandbox":
        return <BrandCodeSandboxIcon color={COLOR.greyDark} />;
      case "framer":
        return <BrandFramerIcon color={COLOR.greyDark} />;
      case "github":
        return <BrandGithubIcon color={COLOR.greyDark} />;
      case "gitlab":
        return <BrandGitlabIcon color={COLOR.greyDark} />;
      case "google":
        return <BrandGoogleIcon color={COLOR.greyDark} />;
      case "miro":
        return <BrandMiroIcon color={COLOR.greyDark} />;
      case "monday":
        return <BrandMondayIcon color={COLOR.greyDark} />;
      case "mural":
        return <BrandMuralIcon color={COLOR.greyDark} />;
      case "notion":
        return <BrandNotionIcon color={COLOR.greyDark} />;
      case "slack":
        return <BrandSlackIcon color={COLOR.greyDark} />;
      case "smartsheet":
        return <BrandSmartsheetIcon color={COLOR.greyDark} />;
      case "storybook":
        return <BrandStorybookIcon color={COLOR.greyDark} />;
      case "teams":
        return <BrandTeamsIcon color={COLOR.greyDark} />;
      case "microsoft":
        return <BrandMicrosoftIcon color={COLOR.greyDark} />;
      case "trello":
        return <BrandTrelloIcon color={COLOR.greyDark} />;
      case "link":
      default:
        return <ActionLinkIcon color={COLOR.greyDark} />;
    }
  }

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
          topRight: editing ? RADIUS.none : RADIUS.xs,
          bottomRight: editing ? RADIUS.none : RADIUS.xs,
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
            src={assignSvg(icon)}
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
      {editing && (
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
            height={SPACE.xs}
            width={SPACE.xs}
            src={<ActionDeleteIcon color={COLOR.greyDark} />}
          />
        </AutoLayout>
      )}
    </AutoLayout>
  )
}