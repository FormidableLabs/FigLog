import { ChangeLog } from '../types/ChangeLog';
import { User } from './log/User';
import { COLOR, GAP, SPACE } from '../utilities/Styles';
import { ChangeLogEditing } from './log/LogEditing';
import { ChangeLogDisplay } from './log/LogDisplay';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void; // update this change log
  updateOthers: (changes: Partial<ChangeLog>) => void; // update all other change logs
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
}

export const ChangeLogRow = ({
  changeLogId,
  changeLog,
  isLastRow,
  updateChange,
  updateOthers,
  deleteChange,
  setUpdatedDate,
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
        {!!changeLog.state?.editing ? (
          <ChangeLogEditing
            changeLog={changeLog}
            updateChange={updateChange}
            updateOthers={updateOthers}
            deleteChange={deleteChange}
            setUpdatedDate={setUpdatedDate}
            showTypes={showTypes}
          />
        ): (
          <ChangeLogDisplay
            changeLog={changeLog}
            updateChange={updateChange}
            showTypes={showTypes}
          />
        )}
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
