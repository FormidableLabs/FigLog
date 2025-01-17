import { ChangeLog, ChangeLogState } from '../types/ChangeLog';
import { User } from './log/User';
import { COLOR, GAP, SPACE } from '../utilities/Styles';
import { ChangeLogEditing } from './log/LogEditing';
import { ChangeLogDisplay } from './log/LogDisplay';

const { widget } = figma;
const { AutoLayout, Line } = widget;

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
  nameText: string;
  showName: boolean;
  showVersion: boolean;
  version: string;
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
  nameText,
  showName,
  showVersion,
  version,
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
      <AutoLayout name="Wrapper" overflow="visible" spacing={GAP.sm} width="fill-parent">
        <User
          userName={changeLog.user?.name}
          userPhotoUrl={changeLog.user?.photoUrl}
          showAvatars={showAvatars}
          isLastRow={isLastRow}
          isFocused={!!changeLog.state?.editing && !locked}
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
            nameText={nameText}
            showName={showName}
            showVersion={showVersion}
            version={version}
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
      <Line
        name="Divider"
        hidden={isLastRow}
        stroke={COLOR.grey}
        length="fill-parent"
        strokeDashPattern={[SPACE.xxxs, SPACE.xxxs]}
        strokeCap="round"
        strokeWidth={SPACE.one}
      />
    </AutoLayout>
  );
};
