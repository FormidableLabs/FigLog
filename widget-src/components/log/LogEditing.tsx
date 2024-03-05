import { ChangeLog } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, PADDING, SPACE, RADIUS } from '../../utilities/Styles';
import { DateRange } from './DateRange';
import { formatDate } from '../../utilities/Utils';
import { Button } from '../Button';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';
import { LinkList } from './LinkList';
import { Type } from './Type';
import { TypeMenu } from './TypeMenu';
import { LinkForm } from './LinkForm';
import { AddLink } from './AddLink';

const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

interface ChangeLogEditingProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void; // update this change log
  updateOthers: (changes: Partial<ChangeLog>) => void; // update all other change logs
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
}

export const ChangeLogEditing = ({
  changeLog,
  updateChange,
  updateOthers,
  deleteChange,
  setUpdatedDate,
  showTypes,
}: ChangeLogEditingProps) => {
  return (
    <AutoLayout
      name="ChangeLog Content"
      overflow="visible"
      direction="vertical"
      spacing={GAP.lg}
      padding={{
        vertical: PADDING.xl,
        horizontal: PADDING.none,
      }}
      width="fill-parent"
    >
      <AutoLayout
        name="Meta"
        overflow="visible"
        spacing={GAP.md}
        padding={{
          top: PADDING.none,
          right: PADDING.xxs,
          bottom: PADDING.none,
          left: PADDING.none,
        }}
        width="fill-parent"
        verticalAlignItems="center"
      >
        {!!changeLog.state?.showTypeMenu && (
          <TypeMenu
            currentType={changeLog.type === 'added' ? 'none' : changeLog.type}
            selectType={(newType) => {
              updateChange({
                type: newType !== changeLog.type ? newType : changeLog.type,
                state: {
                  ...changeLog.state,
                  showTypeMenu: !changeLog.state?.showTypeMenu,
                },
              });
            }}
          />
        )}
        {showTypes && (
          <AutoLayout
            name="Action Wrapper"
            onClick={() => {
              updateChange({
                state: {
                  ...changeLog.state,
                  showTypeMenu: !changeLog.state?.showTypeMenu,
                }
              })
            }}
            width="hug-contents"
            positioning='auto'
          >
            <Type type={changeLog.type} />
          </AutoLayout>
        )}
        <Text
          name="Name"
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
        >
          {changeLog.user?.name || ''}
        </Text>

        <DateRange
          editedDate={formatDate(changeLog.editedDate, 'date')}
          editedTime={formatDate(changeLog.editedDate, 'time')}
          date={formatDate(changeLog.createdDate, 'date')}
          time={formatDate(changeLog.createdDate, 'time')}
          editCount={changeLog.editCount}
        />
        <AutoLayout
          name="Actions"
          overflow="visible"
          spacing={GAP.md}
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <AutoLayout
            spacing={GAP.lg}
          >
            <Button
              label="Cancel"
              action={() => {
                updateChange({
                  state: {
                    ...changeLog.state,
                    editing: false,
                  }
                })
              }}
            />
            <Button
              label="Save Changelog"
              action={() => {
                console.log('todo: validate and save stuff');
                updateChange({
                  state: {
                    ...changeLog.state,
                    editing: false,
                  }
                })
              }}
            />
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout name="Changes" overflow="visible" width="fill-parent">
        <Input
          name="EditableChange"
          fill={COLOR.black}
          inputBehavior="multiline"
          inputFrameProps={{
            fill: COLOR.white,
            stroke: COLOR.grey,
            strokeWidth: SPACE.one,
            cornerRadius: RADIUS.xs,
            padding: { horizontal: PADDING.xs, vertical: PADDING.xs },
          }}
          onTextEditEnd={e => {
            if (e.characters !== changeLog.change) {
              updateChange({
                change: e.characters,
                editCount: changeLog.editCount + 1,
                editedDate: Date.now(),
              });
              setUpdatedDate(Date.now());
            }
          }}
          placeholder="Your update..."
          value={changeLog.change}
          width="fill-parent"
          lineHeight={FONT.lineHeight.lg}
          fontFamily={FONT.family}
        />
      </AutoLayout>
      {!!changeLog.links && changeLog.links.length > 0 && (
        <AutoLayout
          name="Links"
          width="fill-parent"
          horizontalAlignItems="end"
          direction="vertical"
        >
          <LinkList
            links={!!changeLog.state?.updates?.links ? [...changeLog.links, ...changeLog.state?.updates?.links] : changeLog.links} // todo: figure out deletion
            editing={true}
            deleteLink={(linkToDelete) => {
              updateChange({
                links: changeLog.links ? changeLog.links.filter(link => link.key !== linkToDelete) : []
              })
            }}
          />
        </AutoLayout> 
      )}
      <AutoLayout
        width="fill-parent"
        direction="vertical"
      >
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          {!!changeLog.state?.showLinkForm ? (
            <LinkForm
              changeLog={changeLog}
              updateChange={updateChange}
              setUpdatedDate={setUpdatedDate}
              />
          ) : (
            <AddLink
              changeLog={changeLog}
              updateChange={updateChange}  
            />
          )} 
        </AutoLayout>
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="start"
          verticalAlignItems="center"
        >
          <Button
            label="Delete ChangeLog"
            iconSrc={<ActionDeleteIcon color={COLOR.greyDark} />}  
            action={deleteChange}
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  )
}
