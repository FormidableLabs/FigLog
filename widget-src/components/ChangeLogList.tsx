import { ChangeLog, ChangeLogState } from '../types/ChangeLog';
import { PADDING } from '../utilities/Styles';
import { ChangeLogRow } from './ChangeLogRow';

const { widget } = figma;
const { AutoLayout, useEffect } = widget;

interface ChangeLogListProps {
  changeLogIds: string[];
  changeLogs: SyncedMap<ChangeLog>;
  updateOtherStates: (changeId: string, changes: Partial<ChangeLogState>) => void;
  deleteChange: (changeId: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
  showAvatars: boolean;
  isLocked: boolean;
}

export const ChangeLogList = ({
  changeLogIds,
  changeLogs,
  updateOtherStates,
  deleteChange,
  setUpdatedDate,
  showTypes,
  showAvatars,
  isLocked,
}: ChangeLogListProps) => {
  useEffect(() => {
    // console.log('ChangeLogs', changeLogs.entries());
  });

  return (
    <AutoLayout
      name="ChangeLog"
      overflow="visible"
      width="fill-parent"
      direction="vertical"
      padding={{
        vertical: PADDING.sm,
        horizontal: PADDING.none,
      }}
    >
      {changeLogs
        .entries()
        .sort((a, b) => b[1].createdDate - a[1].createdDate)
        .map((changeLogArr, index) => {
          const changeLogId = changeLogArr[0];
          const changeLog = changeLogArr[1];

          return (
            <ChangeLogRow
              key={changeLogId}
              changeLogId={changeLogId}
              changeLog={changeLog}
              isLastRow={index === changeLogIds.length - 1}
              updateChange={changes => changeLogs.set(changeLogId, { ...changeLog, ...changes })}
              updateChangeState={changes => changeLogs.set(changeLogId, { ...changeLog, state: { ...changes } })}
              updateOtherStates={updateOtherStates}
              deleteChange={() => deleteChange(changeLogId)}
              setUpdatedDate={setUpdatedDate}
              showTypes={showTypes}
              showAvatars={showAvatars}
              locked={isLocked}
            />
          );
        })}
    </AutoLayout>
  );
};
