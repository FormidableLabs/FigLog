import { ChangeLog, ChangeLogState } from '../types/ChangeLog';
import { PADDING } from '../utilities/Styles';
import { ChangeLogRow } from './ChangeLogRow';

const { widget, currentUser } = figma;
const { AutoLayout, useEffect } = widget;

interface ChangeLogListProps {
  changeLogIds: string[];
  changeLogs: SyncedMap<ChangeLog>;
  updateOtherStates: (changeId: string, changes: Partial<ChangeLogState>) => void;
  deleteChange: (changeId: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
}

export const ChangeLogList = ({
  changeLogIds,
  changeLogs,
  updateOtherStates,
  deleteChange,
  setUpdatedDate,
  showTypes
}: ChangeLogListProps) => {
  useEffect(() => {
    console.log('ChangeLogs', changeLogs.entries());
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
      {changeLogIds.map((changeLogId, index) => {
        const changeLog = changeLogs.get(changeLogId) as ChangeLog;

        return (
          <ChangeLogRow
            key={changeLogId}
            changeLogId={changeLogId}
            changeLog={changeLog}
            isLastRow={index === changeLogIds.length - 1}
            updateChange={changes => changeLogs.set(changeLogId, { ...changeLog, ...changes })}
            updateChangeState={changes => changeLogs.set(changeLogId, { ...changeLog, state: { ... changes }})}
            updateOtherStates={updateOtherStates}
            deleteChange={() => deleteChange(changeLogId)}
            setUpdatedDate={setUpdatedDate}
            showTypes={showTypes}
          />
        );
      })}
    </AutoLayout>
  );
};
