import { ChangeLog } from '../../types/ChangeLog';
import { Button } from '../Button';
import { randomId } from '../../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../../utilities/Styles';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';

const { widget } = figma;
const { AutoLayout, Input } = widget;

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

  return (
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
          stroke: COLOR.grey,
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
          if (e.characters !== changeLog.state?.link?.label) {
            updateChange({
              state: {
                ...changeLog.state,
                link: {...changeLog.state?.link, label: e.characters}}
            })
          }
        }}
      />
      <Input 
        name="LinkUrl"
        fill={COLOR.black}
        inputFrameProps={{
          fill: COLOR.white,
          stroke: COLOR.grey,
          strokeWidth: SPACE.one,
          cornerRadius: RADIUS.xs,
          padding: { horizontal: PADDING.xs, vertical: PADDING.xs }
        }}
        width="fill-parent"
        placeholder="Link URL"
        lineHeight={FONT.lineHeight.xs}
        fontSize={FONT.size.xs}
        fontFamily={FONT.family}
        value={changeLog.state?.link?.url || ''}
        onTextEditEnd={(e) => {
          if (e.characters !== changeLog.state?.link?.url) {
            updateChange({
              state: {
                ...changeLog.state,
                link: {...changeLog.state?.link, url: e.characters}}
            })
          }
        }}
      />
      <Button label="Add" action={() => {
        if (!!changeLog.state?.link?.label && !!changeLog.state?.link?.url) {
          const linkKey= `link-${randomId()}`;

          if (!!changeLog.links &&  changeLog.links?.length > 0) {
            updateChange({
              links: [...changeLog.links, { ...changeLog.state.link, key: linkKey }],
              editCount: changeLog.editCount + 1,
              editedDate: Date.now(),
            })
          } else {
            updateChange({
              links: [{...changeLog.state.link, key: linkKey }],
              editCount: changeLog.editCount + 1,
              editedDate: Date.now(),
              state: { // hide form and clear tmp link data
                showLinkForm: false,
                link: {},
              }
            })
          }
          setUpdatedDate(Date.now());
        } else {
          console.log('add an error message!')
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
              link: {},
            }
          })
        }}
      />
    </AutoLayout>
  )
}