import { ChangeLog } from '../../types/ChangeLog';
import { Button } from '../Button';
import { randomId } from '../../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';
import {
  rxUrl,
  rxAsana,
  rxBitbucket,
  rxFigma,
  rxFigmaProto,
  rxFigmaVersion,
  rxGithub,
  rxGitlab,
  rxGoogle,
  rxAtlassian,
  rxNotion,
  rxStorybook,
  rxTrello,
  rxCodePen,
  rxCodeSandbox,
  rxFramer,
  rxSlack,
  rxBasecamp,
  rxChatGpt,
  rxClickUp,
  rxMiro,
  rxMonday,
  rxMural,
  rxSmartsheet,
  rxTeams,
  rxMicrosoft
} from '../../utilities/Regexes';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';


const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface LinkFormProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void;
  setUpdatedDate: (updatedDate: number) => void;
}

export const LinkForm = ({
  changeLog,
  updateChange,
  setUpdatedDate,
}: LinkFormProps) => {

  const validUrl = (address: string | undefined) => {
    if (address === undefined) {
      return false;
    }
    return address !== '' && rxUrl.test(address);
  }

  const validLabel = (label: string | undefined) => {
    if (label === undefined) {
      return false;
    }
    return label !== '' && label.length <= 40;
  }

  const assignIcon = (url: string) => {
    switch (true) {
      case rxFigmaVersion.test(url):
        return "figmaVersion";
      case rxFigmaProto.test(url):
        return "figmaPrototype";
      case rxFigma.test(url):
        return "figma";
      case rxAsana.test(url):
        return "asana";
      case rxAtlassian.test(url):
        return "atlassian";
      case rxBasecamp.test(url):
        return "basecamp";
      case rxBitbucket.test(url):
        return "bitbucket";
      case rxChatGpt.test(url):
        return "chatgpt";
      case rxClickUp.test(url):
        return "clickup";
      case rxCodePen.test(url):
        return "codepen";
      case rxCodeSandbox.test(url):
        return "codesandbox";
      case rxFramer.test(url):
        return "framer";
      case rxGithub.test(url):
        return "github";
      case rxGitlab.test(url):
        return "gitlab";
      case rxGoogle.test(url):
        return "google";
      case rxMiro.test(url):
        return "miro";
      case rxMonday.test(url):
        return "monday";
      case rxMural.test(url):
        return "mural";
      case rxNotion.test(url):
        return "notion";
      case rxSlack.test(url):
        return "slack";
      case rxSmartsheet.test(url):
        return "smartsheet";
      case rxStorybook.test(url):
        return "storybook";
      case rxTeams.test(url):
        return "teams";
      case rxMicrosoft.test(url):
        return "microsoft";
      case rxTrello.test(url):
        return "trello";
      default:
        return "link";
    }
  }

  const errorMsg = (labelError: boolean, urlError: boolean) => {
    switch (true) {
      case (labelError && urlError):
        return "A link label (40 character maximum) and valid url (including 'https://') are required.";
      case (labelError):
        return "A link label (40 character maximum) is required.";
      case (urlError):
        return "A valid url (including 'https://') is required.";
      default:
        return "";
    }
  }

  return (
    <AutoLayout
      width="fill-parent"
      direction="vertical"
      spacing={GAP.sm}
      horizontalAlignItems="end"
      verticalAlignItems="center"
    >
      <AutoLayout
        width="fill-parent"
        horizontalAlignItems="end"
        verticalAlignItems="center"
        spacing={GAP.md}
      >
        <Input 
          name="LinkLabel"
          fill={COLOR.black}
          inputFrameProps={{
            fill: COLOR.white,
            stroke: !!changeLog.state?.linkFormError?.label ? COLOR.red : COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xs, vertical: PADDING.xs }
          }}
          placeholder="Link Label"
          width={SPACE.lg}
          lineHeight={FONT.lineHeight.xs}
          fontSize={FONT.size.xs}
          fontFamily={FONT.family}
          value={changeLog.state?.link?.label || ''}
          onTextEditEnd={(e) => {
            const trimmedLabel = e.characters.trim()
            updateChange({
              state: {
                ...changeLog.state,
                link: {
                  ...changeLog.state?.link,
                  label: trimmedLabel,
                  url: changeLog.state?.link?.url || '',
                  key: changeLog.state?.link?.key || '',
                },
                linkFormError: {
                  label: !validLabel(trimmedLabel),
                  url: !!changeLog.state?.linkFormError?.url,
                }
              },
            })
          }}
        />
        <Input 
          name="LinkUrl"
          fill={COLOR.black}
          inputFrameProps={{
            fill: COLOR.white,
            stroke: !!changeLog.state?.linkFormError?.url ? COLOR.red : COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xs, vertical: PADDING.xs }
          }}
          width="fill-parent"
          placeholder="https://figma.com"
          lineHeight={FONT.lineHeight.xs}
          fontSize={FONT.size.xs}
          fontFamily={FONT.family}
          value={changeLog.state?.link?.url || ''}
          onTextEditEnd={(e) => {
            const trimmedUrl = e.characters.trim();
            updateChange({
              state: {
                ...changeLog.state,
                link: {
                  ...changeLog.state?.link,
                  label: changeLog.state?.link?.label || '',
                  url: trimmedUrl,
                  icon: assignIcon(trimmedUrl),
                  key: changeLog.state?.link?.key || '',
                },
                linkFormError: {
                  label: !!changeLog.state?.linkFormError?.label,
                  url: !validUrl(trimmedUrl),
                }
              },
            })
          }}
        />
        <Button label="Add" action={() => {
          const labelValid = validLabel(changeLog.state?.link?.label);
          const urlValid = validUrl(changeLog.state?.link?.url);
          const linkKey= `link-${randomId()}`;

          if (labelValid && urlValid) {
            updateChange({
              links: !!changeLog.links ? [...changeLog.links, { ...changeLog.state?.link, key: linkKey }] : [{...changeLog.state?.link, key: linkKey }],
              editCount: changeLog.editCount + 1,
              editedDate: Date.now(),
              state: {
                ...changeLog.state,
                showLinkForm: false,
                link: { label: '', url: '', key: '', icon: '' },
                linkFormError: {
                  label: false,
                  url: false,
                }
              }
            })
            setUpdatedDate(Date.now());
          } else {
            updateChange({
              state: {
                ...changeLog.state,
                linkFormError: {
                  label: !labelValid,
                  url: !urlValid
                }
              }
            })
          }
        }} />
        <Button
          label="Cancel"
          hideLabel={true}
          iconSrc={<ActionDeleteIcon color={COLOR.greyDark} />}
          action={() => {
            updateChange({
              state: {
                ...changeLog.state,
                showLinkForm: false,
                link: { label: '', url: '', key: '', icon: '' },
                linkFormError: { label: false, url: false, }
              }
            })
          }}
        />
      </AutoLayout>
      <Text
        fill={COLOR.red}
        fontSize={FONT.size.xs}
        fontFamily={FONT.family}
      >
        {errorMsg(!!changeLog.state?.linkFormError?.label, !!changeLog.state?.linkFormError?.url)}
      </Text>
    </AutoLayout>
  )

}