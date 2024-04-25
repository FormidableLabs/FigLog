import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
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
  rxMicrosoft,
} from '../../utilities/Regexes';
import { ActionCloseIcon } from '../../svgs/ActionCloseIcon';

const { widget } = figma;
const { AutoLayout, Input, Text } = widget;

interface LinkFormProps {
  changeLog: ChangeLog;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  setUpdatedDate: (updatedDate: number) => void;
}

export const LinkForm = ({ changeLog, updateChangeState, setUpdatedDate }: LinkFormProps) => {
  const validUrl = (address: string | undefined) => {
    if (address === undefined) {
      return false;
    }
    return address !== '' && rxUrl.test(address);
  };

  const validLabel = (label: string | undefined) => {
    if (label === undefined) {
      return false;
    }
    return label !== '' && label.length <= 40;
  };

  const assignIcon = (url: string) => {
    switch (true) {
      case rxFigmaVersion.test(url):
        return 'figmaVersion';
      case rxFigmaProto.test(url):
        return 'figmaPrototype';
      case rxFigma.test(url):
        return 'figma';
      case rxAsana.test(url):
        return 'asana';
      case rxAtlassian.test(url):
        return 'atlassian';
      case rxBasecamp.test(url):
        return 'basecamp';
      case rxBitbucket.test(url):
        return 'bitbucket';
      case rxChatGpt.test(url):
        return 'chatgpt';
      case rxClickUp.test(url):
        return 'clickup';
      case rxCodePen.test(url):
        return 'codepen';
      case rxCodeSandbox.test(url):
        return 'codesandbox';
      case rxFramer.test(url):
        return 'framer';
      case rxGithub.test(url):
        return 'github';
      case rxGitlab.test(url):
        return 'gitlab';
      case rxGoogle.test(url):
        return 'google';
      case rxMiro.test(url):
        return 'miro';
      case rxMonday.test(url):
        return 'monday';
      case rxMural.test(url):
        return 'mural';
      case rxNotion.test(url):
        return 'notion';
      case rxSlack.test(url):
        return 'slack';
      case rxSmartsheet.test(url):
        return 'smartsheet';
      case rxStorybook.test(url):
        return 'storybook';
      case rxTeams.test(url):
        return 'teams';
      case rxMicrosoft.test(url):
        return 'microsoft';
      case rxTrello.test(url):
        return 'trello';
      default:
        return 'link';
    }
  };

  const errorMsg = (labelError: boolean, urlError: boolean) => {
    switch (true) {
      case labelError && urlError:
        return "A link label (40 character maximum) and valid url (including 'https://') are required.";
      case labelError:
        return 'Enter label (1-40 characters).';
      case urlError:
        return 'Enter URL (https://, no spaces/specials).';
      default:
        return '';
    }
  };

  return (
    <AutoLayout width="fill-parent" horizontalAlignItems="end" verticalAlignItems="start" spacing={GAP.sm}>
      <AutoLayout name="Input Wrapper" overflow="visible" direction="vertical" spacing={GAP.xs}>
        <Input
          name="LinkLabel"
          fill={COLOR.black}
          inputFrameProps={{
            fill: COLOR.white,
            stroke: !!changeLog.state?.updates?.linkFormError?.label ? COLOR.red : COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xxs, vertical: PADDING.xxs },
          }}
          placeholder="Link Label"
          width={SPACE.lg}
          lineHeight={FONT.lineHeight.sm}
          fontSize={FONT.size.sm}
          fontFamily={FONT.family}
          value={changeLog.state?.updates?.link?.label || ''}
          onTextEditEnd={e => {
            const trimmedLabel = e.characters.trim();
            updateChangeState({
              ...changeLog.state,
              updates: {
                ...changeLog.state?.updates,
                link: {
                  ...changeLog.state?.updates?.link,
                  label: trimmedLabel,
                  url: changeLog.state?.updates?.link?.url || '',
                  key: changeLog.state?.updates?.link?.key || '',
                },
                linkFormError: {
                  label: !validLabel(trimmedLabel),
                  url: !!changeLog.state?.updates?.linkFormError?.url,
                },
              },
            });
          }}
        />
        <Text fill={COLOR.red} fontSize={FONT.size.xs} fontFamily={FONT.family}>
          {!!changeLog.state?.updates?.linkFormError?.label ? 'Enter label (1-40 characters).' : ''}
        </Text>
      </AutoLayout>
      <AutoLayout name="Input Wrapper" overflow="visible" direction="vertical" spacing={GAP.xs} width="fill-parent">
        <Input
          name="LinkUrl"
          fill={COLOR.black}
          inputFrameProps={{
            fill: COLOR.white,
            stroke: !!changeLog.state?.updates?.linkFormError?.url ? COLOR.red : COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xxs, vertical: PADDING.xxs },
          }}
          width="fill-parent"
          placeholder="https://figma.com"
          lineHeight={FONT.lineHeight.sm}
          fontSize={FONT.size.sm}
          fontFamily={FONT.family}
          value={changeLog.state?.updates?.link?.url || ''}
          onTextEditEnd={e => {
            const trimmedUrl = e.characters.trim();
            updateChangeState({
              ...changeLog.state,
              updates: {
                ...changeLog.state?.updates,
                link: {
                  ...changeLog.state?.updates?.link,
                  label: changeLog.state?.updates?.link?.label || '',
                  url: trimmedUrl,
                  icon: assignIcon(trimmedUrl),
                  key: changeLog.state?.updates?.link?.key || '',
                },
                linkFormError: {
                  label: !!changeLog.state?.updates?.linkFormError?.label,
                  url: !validUrl(trimmedUrl),
                },
              },
            });
          }}
        />
        <Text fill={COLOR.red} fontSize={FONT.size.xs} fontFamily={FONT.family}>
          {!!changeLog.state?.updates?.linkFormError?.url ? 'Enter URL (https://, no spaces/specials).' : ''}
        </Text>
      </AutoLayout>
      <AutoLayout name="Actions Wrapper" overflow="visible" spacing={GAP.xs}>
        <Button
          label="Add"
          action={() => {
            const labelValid = validLabel(changeLog.state?.updates?.link?.label);
            const urlValid = validUrl(changeLog.state?.updates?.link?.url);
            const linkKey = `link-${randomId()}`;

            if (labelValid && urlValid) {
              updateChangeState({
                ...changeLog.state,
                showLinkForm: false,
                updates: {
                  ...changeLog.state?.updates,
                  links: changeLog.state?.updates?.links
                    ? [...changeLog.state.updates.links, { ...changeLog.state?.updates?.link, key: linkKey }]
                    : [{ ...changeLog.state?.updates?.link, key: linkKey }],
                  link: { label: '', url: '', key: '', icon: '' },
                  linkFormError: {
                    label: false,
                    url: false,
                  },
                },
              });
              setUpdatedDate(Date.now());
            } else {
              updateChangeState({
                ...changeLog.state,
                updates: {
                  ...changeLog.state?.updates,
                  linkFormError: {
                    label: !labelValid,
                    url: !urlValid,
                  },
                },
              });
            }
          }}
        />
        <Button
          label="Cancel"
          hideLabel
          iconSrc={<ActionCloseIcon color={COLOR.greyDark} />}
          action={() => {
            updateChangeState({
              ...changeLog.state,
              showLinkForm: false,
              updates: {
                ...changeLog.state?.updates,
                link: { label: '', url: '', key: '', icon: '' },
                linkFormError: { label: false, url: false },
              },
            });
          }}
        />
      </AutoLayout>
    </AutoLayout>
  );
};
