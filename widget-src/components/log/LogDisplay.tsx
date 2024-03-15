import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, PADDING } from '../../utilities/Styles';
import { Type } from './Type';
import { DateRange } from './DateRange';
import { Button } from '../Button';
import { ActionEditIcon } from '../../svgs/ActionEditIcon';
import { LinkList } from './LinkList';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface ChangeLogDisplayProps {
  changeLogId: string,
  changeLog: ChangeLog;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  updateOtherStates: (changeId: string, changes: Partial<ChangeLogState>) => void;
  showTypes: boolean;
}

export const ChangeLogDisplay = ({
  changeLogId,
  changeLog,
  updateChangeState,
  updateOtherStates,
  showTypes,
}: ChangeLogDisplayProps) => {
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
        {showTypes && changeLog.type !== ('none' || 'added') && (
          <Type type={changeLog.type} />
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
          changeLog={changeLog}
          timestamp={changeLog.createdDate}
          editedTimestamp={changeLog.editedDate}
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
          <Button
            label="Edit"
            hideLabel={true}
            iconSrc={<ActionEditIcon />}
            action={() => {
              updateChangeState({
                ...changeLog.state,
                editing: true,
                updates: {
                  createdDate: changeLog.createdDate,
                  links: changeLog.links,
                  link: { label: '', url: '', icon: '', key: ''},
                  type: changeLog.type,
                  change: changeLog.change,
                  linkFormError: { label: false, url: false },
                }
              })
              updateOtherStates(changeLogId, { editing: false })
            }}
          />
        </AutoLayout>
      </AutoLayout>
      <AutoLayout name="Changes" overflow="visible" width="fill-parent">
        <Text
          name="Change"
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.lg}
          fontFamily={FONT.family}
          width={'fill-parent'}
        >
          {changeLog.change || ''}
        </Text>
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
          />
        </AutoLayout> 
      )}
    </AutoLayout>
  )
}
