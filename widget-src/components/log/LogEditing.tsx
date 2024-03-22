import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, PADDING, SPACE, RADIUS } from '../../utilities/Styles';
import { DateRangeForm } from './DateRangeForm';
import { Button } from '../Button';
import { ActionDeleteIcon } from '../../svgs/ActionDeleteIcon';
import { LinkList } from './LinkList';
import { Type } from './Type';
import { TypeMenu } from './TypeMenu';
import { LinkForm } from './LinkForm';
import { AddLink } from './AddLink';

const { widget } = figma;
const { AutoLayout, Text, Input, useEffect } = widget;

interface ChangeLogEditingProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
}

export const ChangeLogEditing = ({
  changeLog,
  updateChange,
  updateChangeState,
  deleteChange,
  setUpdatedDate,
  showTypes,
}: ChangeLogEditingProps) => {

  useEffect(() => {
    console.log('state: ', changeLog.state);
  })

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
        {showTypes && (
          <>
            {!!changeLog.state?.showTypeMenu && (
              <TypeMenu
                currentType={!!changeLog.state?.updates?.type ? changeLog.state?.updates?.type : changeLog.type}
                selectType={(newType) => {
                  updateChangeState({
                    ...changeLog.state,
                    showTypeMenu: !changeLog.state?.showTypeMenu,
                    updates: {
                      ...changeLog.state?.updates,
                      type: newType !== changeLog.type ? newType : changeLog.type,
                    }
                    
                  });
                }}
              />
            )}
            <AutoLayout
              name="Action Wrapper"
              onClick={() => {
                updateChangeState({
                  ...changeLog.state,
                  showTypeMenu: !changeLog.state?.showTypeMenu,
                })
              }}
              width="hug-contents"
              positioning='auto'
            >
              <Type type={!!changeLog.state?.updates?.type ? changeLog.state?.updates?.type : changeLog.type} />
            </AutoLayout>
          </>
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

        <DateRangeForm
          changeLog={changeLog}
          timestamp={changeLog.state?.updates?.createdDate || changeLog.createdDate}
          updateChangeState={updateChangeState}
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
                updateChangeState({
                  ...changeLog.state,
                  editing: false,
                })
              }}
            />
            <Button
              label="Save Change"
              action={() => {
                const dateError = !!changeLog.state?.updates?.createdDateTmp?.date.er;
                const timeError = !!changeLog.state?.updates?.createdDateTmp?.time.er;
                if ( !dateError && !timeError ) {
                  const saveCreatedDate = changeLog.state?.updates?.createdDate || changeLog.createdDate;
                  const saveType = changeLog.state?.updates?.type || changeLog.type; 
                  const saveChange = changeLog.state?.updates?.change || changeLog.change;
                  const saveLinks = changeLog.state?.updates?.links || changeLog.links;
  
                  updateChange({
                    createdDate: saveCreatedDate,
                    editedDate: Date.now(),
                    type: saveType,
                    change: saveChange,
                    links: saveLinks,
                    editCount: ++changeLog.editCount,
                    state: {
                      ...changeLog.state,
                      editing: false,
                    }
                  })
                  setUpdatedDate(Date.now());
                }
              }}
            />
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        name="Changes"
        overflow="visible"
        width="fill-parent"
        padding={{ top: PADDING.xs }}
      >
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
              updateChangeState({
                ...changeLog.state,
                updates: {
                  ...changeLog.state?.updates,
                  change: e.characters,
                }
              });
              
            }
          }}
          placeholder="Your update..."
          value={changeLog.state?.updates?.change || changeLog.change}
          width="fill-parent"
          lineHeight={FONT.lineHeight.lg}
          fontFamily={FONT.family}
        />
      </AutoLayout>
      {!!changeLog.state?.updates?.links && changeLog.state?.updates?.links.length > 0 && (
        <AutoLayout
          name="Links"
          width="fill-parent"
          horizontalAlignItems="end"
          direction="vertical"
        >
          <LinkList
            links={!!changeLog.state?.updates?.links ? changeLog.state?.updates?.links : []}
            editing={true}
            deleteLink={(linkToDelete) => {
              updateChangeState({
                ...changeLog.state,
                updates: {
                  ...changeLog.state?.updates,
                  links: changeLog.state?.updates?.links ? changeLog.state?.updates?.links.filter(link => link.key !== linkToDelete) : []
                }
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
              updateChangeState={updateChangeState}
              setUpdatedDate={setUpdatedDate}
              />
          ) : (
            <AddLink
              changeLog={changeLog}
              updateChangeState={updateChangeState}  
            />
          )} 
        </AutoLayout>
        <AutoLayout
          width="fill-parent"
          horizontalAlignItems="start"
          verticalAlignItems="center"
        >
          <Button
            label="Delete Change"
            iconSrc={<ActionDeleteIcon color={COLOR.greyDark} />}  
            action={deleteChange}
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  )
}
