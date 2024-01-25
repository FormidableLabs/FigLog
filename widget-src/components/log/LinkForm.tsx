import { ChangeLog } from '../../types/ChangeLog';
import { Button } from '../Button';
import { randomId } from '../../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';
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

  const validUrl = (address: string) => {
    const urlRegex = new RegExp(/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi)
    return urlRegex.test(address);
  }

  const errorMsg = (labelError: boolean, urlError: boolean) => {
    if (labelError && urlError) {
      return "A link label and valid url - including 'https://' are required.";
    } else if (labelError) {
      return "A link label is required."
    } else if (urlError) {
      return "A valid url - including 'https://' is required."
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
            updateChange({
              state: {
                ...changeLog.state,
                link: {
                  ...changeLog.state?.link,
                  label: e.characters,
                  url: changeLog.state?.link?.url || '',
                  key: changeLog.state?.link?.key || '',
                },
                linkFormError: {
                  label: e.characters === '',
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
            updateChange({
              state: {
                ...changeLog.state,
                link: {
                  ...changeLog.state?.link,
                  label: changeLog.state?.link?.label || '',
                  url: e.characters,
                  key: changeLog.state?.link?.key || '',
                },
                linkFormError: {
                  label: !!changeLog.state?.linkFormError?.label,
                  url: e.characters === '' || !validUrl(e.characters),
                }
              },
            })
          }}
        />
        <Button label="Add" action={() => {
          const labelExists = !!changeLog.state?.link?.label;
          const urlValid = !!changeLog.state?.link?.url && validUrl(changeLog.state?.link?.url);
          const linkKey= `link-${randomId()}`;

          if (labelExists && urlValid) {
            updateChange({
              links: !!changeLog.links ? [...changeLog.links, { ...changeLog.state?.link, key: linkKey }] : [{...changeLog.state?.link, key: linkKey }],
              editCount: changeLog.editCount + 1,
              editedDate: Date.now(),
              state: {
                showLinkForm: false,
                link: { label: '', url: '', key: '' },
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
                  label: !labelExists,
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
                link: { label: '', url: '', key: '' },
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