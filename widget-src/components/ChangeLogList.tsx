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

export const ChangeLogList = (props: ChangeLogListProps) => {
  useEffect(() => {
    console.log('ChangeLogs', props.changeLogs.entries());
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
      {props.changeLogIds.map((changeLogId, index) => {
        const changeLog = props.changeLogs.get(changeLogId) as ChangeLog;

        function isEditable(): boolean {
          // if widget admin
          // if (props.adminId === currentUser?.id) { return true; }
          // if changeLog owner
          // if (changeLog?.user?.id === currentUser?.id) { return true; }
          return true;
        }

        return (
          <ChangeLogRow
            key={changeLogId}
            changeLogId={changeLogId}
            changeLog={changeLog}
            isLastRow={index === props.changeLogIds.length - 1}
            updateChange={changes => props.changeLogs.set(changeLogId, { ...changeLog, ...changes })}
            deleteChange={() => props.deleteChange(changeLogId)}
            setUpdatedDate={props.setUpdatedDate}
            isEditable={isEditable()}
          />
        );
      })}
    </AutoLayout>
  );
};
