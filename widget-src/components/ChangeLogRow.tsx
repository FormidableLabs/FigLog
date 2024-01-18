import { ChangeLog } from '../types/ChangeLog';
import { Button } from './Button';
import { User } from './log/User';
import { DateRange } from './log/DateRange';
import { Type } from './log/Type';
import { formatDate } from '../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, SPACE } from '../utilities/Styles';
import { TypeMenu } from './log/TypeMenu';
import { ActionDeleteIcon } from '../svgs/ActionDeleteIcon';
import { ActionLinkIcon } from '../svgs/ActionLinkIcon';
import { LinkForm } from './log/LinkForm';
import { LinkList } from './log/LinkList';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  isEditable: boolean;
  showTypes: boolean;
}

export const ChangeLogRow = ({
  changeLogId,
  changeLog,
  isLastRow,
  updateChange,
  deleteChange,
  setUpdatedDate,
  isEditable,
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
            {!!changeLog.state?.showTypeMenu && (
              <TypeMenu
                currentType={changeLog.type}
                selectType={(newType) => {
                  if (newType !== changeLog.type) {
                    updateChange({
                      type: newType,
                      editCount: changeLog.editCount + 1,
                      editedDate: Date.now(),
                      state: {
                        ...changeLog.state,
                        showTypeMenu: !changeLog.state?.showTypeMenu,
                      }
                    });
                    setUpdatedDate(Date.now());
                  }
                }}
              />
            )}
            {showTypes && (
              <Type
                type={changeLog.type} 
                action={() => {
                  updateChange({
                    state: {
                      ...changeLog.state,
                      showTypeMenu: !changeLog.state?.showTypeMenu,
                    }
                  })
                }}
              />
            )}
            <Text
              name="Date"
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
            {isEditable && (
              <AutoLayout
                name="Actions"
                overflow="visible"
                spacing={GAP.md}
                width="fill-parent"
                horizontalAlignItems="end"
                verticalAlignItems="center"
              >
                <Button label="Delete" hideLabel={true} iconSrc={<ActionDeleteIcon />} action={deleteChange} />
              </AutoLayout>
            )}
          </AutoLayout>
          <AutoLayout name="Changes" overflow="visible" width="fill-parent">
            {isEditable ? (
              <Input
                name="EditableChange"
                fill={COLOR.black}
                inputBehavior="multiline"
                inputFrameProps={{
                  fill: COLOR.white,
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
                {changeLog.change || '...'}
              </Text>
            )}
          </AutoLayout>
          <AutoLayout
            width="fill-parent"
            horizontalAlignItems="end"
            direction="vertical"
          >
            <LinkList
              links={changeLog.links}
              deleteLink={(linkToDelete) => {
                updateChange({
                  links: changeLog.links ? changeLog.links.filter(link => link.key !== linkToDelete) : []
                })
              }}
            />
            <AutoLayout
              width="fill-parent"
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              <LinkForm
                changeLog={changeLog}
                updateChange={updateChange}
                setUpdatedDate={setUpdatedDate}
              />
            </AutoLayout>
          </AutoLayout>
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
