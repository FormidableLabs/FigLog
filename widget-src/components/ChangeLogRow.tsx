import { User } from './User';
import { LogDate } from './LogDate';
import { Button } from './Button';
import { LogType } from './LogType';
// Links

const { widget } = figma;
const { AutoLayout, Input, Text, Rectangle } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void;
  deleteChange: () => void;
}

export const ChangeLogRow = (props: ChangeLogRowProps) => {
  console.log('changeLogId', props.changeLogId, 'changeLog', props.changeLog);

  return (
    <AutoLayout name="ChangeLogRow" fill="#FFF" overflow="visible" direction="vertical" width="fill-parent" {...props}>
      <AutoLayout name="Wrapper" overflow="visible" spacing={8} width="fill-parent">
        <User userName={props.changeLog?.user?.name} userPhotoUrl={props.changeLog?.user?.photoUrl} />
        <AutoLayout
          name="Change Content"
          overflow="visible"
          direction="vertical"
          spacing={16}
          padding={{
            vertical: 24,
            horizontal: 0,
          }}
          width="fill-parent"
        >
          <AutoLayout
            name="Meta"
            overflow="visible"
            spacing={8}
            padding={{
              top: 0,
              right: 4,
              bottom: 0,
              left: 0,
            }}
            width="fill-parent"
            verticalAlignItems="center"
          >
            <LogType type="Added" />
            <LogDate date={props.changeLog?.date} edited={false} />
            <AutoLayout
              name="Actions"
              overflow="visible"
              spacing={8}
              width="fill-parent"
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              {/* <Button label="Edit" hideLabel={true} action={} /> */}
              <Button label="Delete" hideLabel={true} action={props.deleteChange} />
            </AutoLayout>
          </AutoLayout>
          <AutoLayout name="Changes" overflow="visible" width="fill-parent">
            <Input
              name="Change"
              fill="#2F2D2E"
              inputBehavior="multiline"
              inputFrameProps={{
                fill: '#FFF',
              }}
              onTextEditEnd={e => {
                props.updateChange({ change: e.characters });
              }}
              placeholder="Your update..."
              value={props.changeLog.change}
              width="fill-parent"
              lineHeight={24}
              fontFamily="IBM Plex Sans"
            />
          </AutoLayout>
          {/* <Links name="Links" /> */}
        </AutoLayout>
      </AutoLayout>
      <Rectangle
        name="Divider"
        hidden={props.isLastRow}
        stroke="#E6E6E6"
        width="fill-parent"
        height={1}
        strokeDashPattern={[4, 4]}
      />
    </AutoLayout>
  );
};
