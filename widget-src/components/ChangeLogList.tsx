import { ChangeLog } from '../types/ChangeLog';
import { PADDING } from '../utilities/Styles';
import { ChangeLogRow } from './ChangeLogRow';

const { widget, currentUser } = figma;
const { AutoLayout, useEffect } = widget;

interface ChangeLogListProps {
  changeLogIds: string[];
  changeLogs: SyncedMap<ChangeLog>;
  adminId: string;
  deleteChange: (changeId: string) => void;
  setUpdatedDate: (updatedDate: number) => void;
}

export const ChangeLogList = ({
  changeLogIds,
  changeLogs,
  // adminId,
  deleteChange,
  setUpdatedDate,
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

        function isEditable(): boolean {
          // if widget admin
          // if (adminId === currentUser?.id) { return true; }
          // if changeLog owner
          // if (changeLog?.user?.id === currentUser?.id) { return true; }
          return true;
        }

        return (
          <ChangeLogRow
            key={changeLogId}
            changeLogId={changeLogId}
            changeLog={changeLog}
            isLastRow={index === changeLogIds.length - 1}
            updateChange={changes => changeLogs.set(changeLogId, { ...changeLog, ...changes })}
            deleteChange={() => deleteChange(changeLogId)}
            setUpdatedDate={setUpdatedDate}
            isEditable={isEditable()}
          />
        );
      })}
    </AutoLayout>
  );
};
