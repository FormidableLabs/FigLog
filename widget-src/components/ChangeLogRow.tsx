import { ChangeLog } from '../types/ChangeLog';
import { Button } from './Button';
import { User } from './log/User';
import { DateRange } from './log/DateRange';
import { formatDate } from '../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, RADIUS, SPACE } from '../utilities/Styles';
import { ActionDeleteIcon } from '../svgs/ActionDeleteIcon';
import { LinkForm } from './log/LinkForm';
import { LinkList } from './log/LinkList';
import { AddLink } from './log/AddLink';
import { TypeDisplay } from './log/TypeDisplay';
import { ActionEditIcon } from '../svgs/ActionEditIcon';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void; // update this change log
  updateOthers: (changes: Partial<ChangeLog>) => void; // update all other change logs
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
}

export const ChangeLogRow = ({
  changeLogId,
  changeLog,
  isLastRow,
  updateChange,
  updateOthers,
  deleteChange,
  setUpdatedDate,
  showTypes,
}: ChangeLogRowProps) => {

  return (
    <AutoLayout
      key={changeLogId}
      name="ChangeLogRow"
      fill={COLOR.white}
      overflow="visible"
      direction="vertical"
      width="fill-parent"
    >
      <AutoLayout name="Wrapper" overflow="visible" spacing={GAP.md} width="fill-parent">
        <User userName={changeLog.user?.name} userPhotoUrl={changeLog.user?.photoUrl} />
        <AutoLayout
          name="Change Content"
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
            {showTypes && (
              <TypeDisplay
                changeLog={changeLog}
                updateChange={updateChange}
                updateOthers={updateOthers}
              />
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
              {!!changeLog.state?.editing ? (
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
              ) : (
                <Button
                  label="Edit"
                  hideLabel={true}
                  iconSrc={<ActionEditIcon />}
                  action={() => {
                    updateChange({
                      state: {
                        ...changeLog.state,
                        editing: true,
                      }
                    })
                  }}
                />
              )}
            </AutoLayout>
          </AutoLayout>
          <AutoLayout name="Changes" overflow="visible" width="fill-parent">
            {!!changeLog.state?.editing ? (
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
            ) : (
              <Text
                name="Change"
                fill={COLOR.black}
                lineHeight={FONT.lineHeight.lg}
                fontFamily={FONT.family}
                width={'fill-parent'}
              >
                {changeLog.change || ''}
              </Text>
            )}
          </AutoLayout>
          {!!changeLog.links && changeLog.links.length > 0 && (
            <AutoLayout
              name="Links"
              width="fill-parent"
              horizontalAlignItems="end"
              direction="vertical"
            >
              <LinkList
                links={changeLog.links}
                editing={!!changeLog.state?.editing}
                deleteLink={(linkToDelete) => {
                  updateChange({
                    links: changeLog.links ? changeLog.links.filter(link => link.key !== linkToDelete) : []
                  })
                }}
              />
            </AutoLayout> 
          )}
          {!!changeLog.state?.editing && (
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
          )}

        </AutoLayout>
      </AutoLayout>
      <Rectangle
        name="Divider"
        hidden={isLastRow}
        stroke={COLOR.grey}
        width="fill-parent"
        height={SPACE.one}
        strokeDashPattern={[GAP.sm, GAP.sm]}
      />
    </AutoLayout>
  );
};
