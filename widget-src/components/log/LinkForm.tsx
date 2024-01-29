import { ChangeLog } from '../../types/ChangeLog';
import { Button } from '../Button';
import { randomId } from '../../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';
import { rxUrl, rxAsana, rxBitbucket, rxFigma, rxFigmaProto, rxFigmaVersion, rxGithub, rxGitlab, rxGoogle, rxJira, rxNotion, rxStorybook, rxTrello } from '../../utilities/Regexes';
import { BrandFigmaIcon } from '../../svgs/BrandFigmaIcon';
import { BrandAsanaIcon } from '../../svgs/BrandAsanaIcon';
import { BrandBitbucketIcon } from '../../svgs/BrandBitbucketIcon';
import { BrandGithubIcon } from '../../svgs/BrandGithubIcon';
import { BrandGitlabIcon } from '../../svgs/BrandGitlabIcon';
import { BrandJiraIcon } from '../../svgs/BrandJiraIcon';
import { BrandNotionIcon } from '../../svgs/BrandNotionIcon';
import { BrandStorybookIcon } from '../../svgs/BrandStorybookIcon';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';
import { ActionLinkIcon } from '../../svgs/ActionLinkIcon';
import { FileHistory } from '../../svgs/FileHistory';
import { BrandGoogleIcon } from '../../svgs/BrandGoogleIcon';
import { BrandTrelloIcon } from '../../svgs/BrandTrelloIcon';

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
        return <FileHistory color={COLOR.greyDark} />;
      case rxFigma.test(url):
      case rxFigmaProto.test(url):
        return <BrandFigmaIcon color={COLOR.greyDark} />;
      case rxAsana.test(url):
        return <BrandAsanaIcon color={COLOR.greyDark} />;
      case rxBitbucket.test(url):
        return <BrandBitbucketIcon color={COLOR.greyDark} />;
      case rxGithub.test(url):
        return <BrandGithubIcon color={COLOR.greyDark} />;
      case rxGitlab.test(url):
        return <BrandGitlabIcon color={COLOR.greyDark} />;
      case rxGoogle.test(url):
        return <BrandGoogleIcon color={COLOR.greyDark} />;
      case rxJira.test(url):
        return <BrandJiraIcon color={COLOR.greyDark} />;
      case rxNotion.test(url):
        return <BrandNotionIcon color={COLOR.greyDark} />;
      case rxStorybook.test(url):
        return <BrandStorybookIcon color={COLOR.greyDark} />;
      case rxTrello.test(url):
        return <BrandTrelloIcon color={COLOR.greyDark} />;
      default:
        return <ActionLinkIcon color={COLOR.greyDark} />;
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