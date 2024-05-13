import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, PADDING } from '../../utilities/Styles';
import { Type } from './Type';
import { DateRange } from './DateRangeDisplay';
import { Button } from '../Button';
import { ActionEditIcon } from '../../svgs/ActionEditIcon';
import { LinkList } from './LinkList';
import { displayDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface ChangeLogDisplayProps {
  changeLogId: string;
  changeLog: ChangeLog;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  updateOtherStates: (changeId: string, changes: Partial<ChangeLogState>) => void;
  showTypes: boolean;
  locked: boolean;
  isLastRow: boolean;
}

export const ChangeLogDisplay = ({
  changeLogId,
  changeLog,
  updateChangeState,
  updateOtherStates,
  showTypes,
  locked,
  isLastRow,
}: ChangeLogDisplayProps) => {
  return (
    <AutoLayout
      name="ChangeLog Content"
      overflow="visible"
      direction="vertical"
      spacing={GAP.md}
      padding={{
        top: PADDING.xl,
        bottom: isLastRow ? PADDING.none : PADDING.xl,
        horizontal: PADDING.none,
      }}
      width="fill-parent"
    >
      <AutoLayout
        name="Meta"
        overflow="visible"
        spacing={GAP.sm}
        padding={{
          top: PADDING.none,
          right: PADDING.xxs,
          bottom: PADDING.none,
          left: PADDING.none,
        }}
        width="fill-parent"
        verticalAlignItems="center"
      >
        {showTypes && changeLog.type !== ('none' || 'added') && <Type type={changeLog.type} />}
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
          timestamp={changeLog.createdDate}
          editedTimestamp={changeLog.editedDate}
          editCount={changeLog.editCount}
        />
        <AutoLayout
          name="Actions"
          overflow="visible"
          spacing={GAP.sm}
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          {!locked && (
            <Button
              label="Edit"
              hideLabel={true}
              iconSrc={<ActionEditIcon />}
              action={() => {
                updateChangeState({
                  ...changeLog.state,
                  editing: true,
                  updates: {
                    createdDate: changeLog.state?.updates?.createdDate
                      ? changeLog.state?.updates?.createdDate
                      : changeLog.createdDate,
                    createdDateTmp: {
                      date: {
                        val: changeLog.state?.updates?.createdDateTmp?.date?.er
                          ? changeLog.state?.updates?.createdDateTmp?.date?.val
                          : displayDate(
                              changeLog.state?.updates?.createdDate
                                ? changeLog.state?.updates?.createdDate
                                : changeLog.createdDate,
                              'date',
                            ),
                        er: changeLog.state?.updates?.createdDateTmp?.date?.er
                          ? changeLog.state?.updates?.createdDateTmp?.date?.er
                          : false,
                      },
                      time: {
                        val: changeLog.state?.updates?.createdDateTmp?.time?.er
                          ? changeLog.state?.updates?.createdDateTmp?.time?.val
                          : displayDate(
                              changeLog.state?.updates?.createdDate
                                ? changeLog.state?.updates?.createdDate
                                : changeLog.createdDate,
                              'time',
                            ),
                        er: changeLog.state?.updates?.createdDateTmp?.time?.er
                          ? changeLog.state?.updates?.createdDateTmp?.time?.er
                          : false,
                      },
                    },
                    links: changeLog.state?.updates?.links ? changeLog.state?.updates?.links : [],
                    link: {
                      label: changeLog.state?.updates?.link?.label ? changeLog.state?.updates?.link?.label : '',
                      url: changeLog.state?.updates?.link?.url ? changeLog.state?.updates?.link?.url : '',
                      icon: changeLog.state?.updates?.link?.icon ? changeLog.state?.updates?.link?.icon : '',
                      key: changeLog.state?.updates?.link?.key ? changeLog.state?.updates?.link?.key : '',
                    },
                    type: changeLog.state?.updates?.type ? changeLog.state?.updates?.type : changeLog.type,
                    change: changeLog.state?.updates?.change ? changeLog.state?.updates?.change : changeLog.change,
                    linkFormError: {
                      label: changeLog.state?.updates?.linkFormError?.label
                        ? changeLog.state?.updates?.linkFormError?.label
                        : false,
                      url: changeLog.state?.updates?.linkFormError?.url
                        ? changeLog.state?.updates?.linkFormError?.url
                        : false,
                    },
                  },
                });
                updateOtherStates(changeLogId, { editing: false });
              }}
            />
          )}
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
          overflow="visible"
          width="fill-parent"
          height="hug-contents"
          direction="horizontal"
          wrap
          spacing={GAP.sm}
        >
          <LinkList links={changeLog.links} />
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
