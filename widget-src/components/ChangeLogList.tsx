import { PADDING } from '../utilities/Styles';
import { ChangeLogRow } from './ChangeLogRow';

const { widget } = figma;
const { AutoLayout } = widget;

interface ChangeLogListProps {
  changeLogIds: string[];
  changeLogs: SyncedMap<ChangeLog>;
  deleteChange: (changeId: string) => void;
  setUpdatedDate: (updatedDate: string) => void;
}

export const ChangeLogList = (props: ChangeLogListProps) => {
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
        const changeLog = props.changeLogs.get(changeLogId);

        return (
          <ChangeLogRow
            key={changeLogId}
            changeLogId={changeLogId}
            changeLog={changeLog as ChangeLog}
            isLastRow={index === props.changeLogIds.length - 1}
            updateChange={changes => props.changeLogs.set(changeLogId, { ...changeLog, ...(changes as ChangeLog) })}
            deleteChange={() => props.deleteChange(changeLogId)}
            setUpdatedDate={props.setUpdatedDate}
          />
        );
      })}
    </AutoLayout>
  );
};
