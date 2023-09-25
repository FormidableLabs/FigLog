import { ChangeLogRow } from './ChangeLogRow';

const { widget } = figma;
const { AutoLayout } = widget;

interface ChangeLogListProps {
  changeLogIds: string[];
  changeLogs: SyncedMap<ChangeLog>;
  deleteChange: (changeId: string) => void;
}

export const ChangeLogList = (props: ChangeLogListProps) => (
  <AutoLayout
    name="ChangeLog"
    overflow="visible"
    width="fill-parent"
    direction="vertical"
    padding={{
      vertical: 8,
      horizontal: 0,
    }}
  >
    {props.changeLogIds.reverse().map((changeLogId, index) => {
      const changeLog = props.changeLogs.get(changeLogId);

      return (
        <ChangeLogRow
          key={changeLogId}
          changeLogId={changeLogId}
          changeLog={changeLog}
          isLastRow={index === props.changeLogIds.length - 1}
          updateChange={changes => props.changeLogs.set(changeLogId, { ...changeLog, ...changes })}
          deleteChange={() => props.deleteChange(changeLogId)}
        />
      );
    })}
  </AutoLayout>
);
