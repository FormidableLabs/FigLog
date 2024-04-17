import { ChangeLog, ChangeLogState } from '../types/ChangeLog';
import { User } from './log/User';
import { COLOR, GAP, SPACE } from '../utilities/Styles';
import { ChangeLogEditing } from './log/LogEditing';
import { ChangeLogDisplay } from './log/LogDisplay';

const { widget } = figma;
const { AutoLayout, Rectangle } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  updateOtherStates: (changeId: string, changes: Partial<ChangeLogState>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
  showAvatars: boolean;
  locked: boolean;
}

export const ChangeLogRow = ({
  changeLogId,
  changeLog,
  isLastRow,
  updateChange,
  updateChangeState,
  updateOtherStates,
  deleteChange,
  setUpdatedDate,
  showTypes,
  showAvatars,
  locked,
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
        <User
          userName={changeLog.user?.name}
          userPhotoUrl={changeLog.user?.photoUrl}
          showAvatars={showAvatars}
          isLastRow={isLastRow}
        />
        {!!changeLog.state?.editing && !locked ? (
          <ChangeLogEditing
            changeLog={changeLog}
            updateChange={updateChange}
            updateChangeState={updateChangeState}
            deleteChange={deleteChange}
            setUpdatedDate={setUpdatedDate}
            showTypes={showTypes}
            isLastRow={isLastRow}
          />
        ) : (
          <ChangeLogDisplay
            changeLogId={changeLogId}
            changeLog={changeLog}
            updateChangeState={updateChangeState}
            updateOtherStates={updateOtherStates}
            showTypes={showTypes}
            locked={locked}
            isLastRow={isLastRow}
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
