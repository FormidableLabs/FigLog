import { Button } from './Button';
import { User } from './log/User';
import { DateRange } from './log/DateRange';
// import { Type } from './log/Type';
import { formatDate } from '../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  isEditable: boolean;
}

export const ChangeLogRow = (props: ChangeLogRowProps) => {
  return (
    <AutoLayout
      name="ChangeLogRow"
      fill={COLOR.white}
      overflow="visible"
      direction="vertical"
      width="fill-parent"
      {...props}
    >
      <AutoLayout name="Wrapper" overflow="visible" spacing={GAP.md} width="fill-parent">
        <User userName={props.changeLog.user?.name} userPhotoUrl={props.changeLog.user?.photoUrl} />
        <AutoLayout
          name="Change Content"
          overflow="visible"
          direction="vertical"
          spacing={GAP.lg}
          padding={{
            vertical: PADDING.xl,
            horizontal: PADDING.none,
          }}
          width="fill-parent"
        >
          <AutoLayout
            name="Meta"
            overflow="visible"
            spacing={GAP.md}
            padding={{
              top: PADDING.none,
              right: PADDING.xxs,
              bottom: PADDING.none,
              left: PADDING.none,
            }}
            width="fill-parent"
            verticalAlignItems="center"
          >
            {/* <Type type="Added" /> */}
            <Text
              name="Date"
              fill={COLOR.black}
              lineHeight={FONT.lineHeight.sm}
              fontFamily={FONT.family}
              fontSize={FONT.size.sm}
              letterSpacing={FONT.letterSpacing.sm}
              fontWeight={FONT.weight.bold}
              textCase="upper"
            >
              {props.changeLog.user?.name || ''}
            </Text>

            <DateRange
              editedDate={formatDate(props.changeLog.editedDate, 'date')}
              editedTime={formatDate(props.changeLog.editedDate, 'time')}
              date={formatDate(props.changeLog.createdDate, 'date')}
              time={formatDate(props.changeLog.createdDate, 'time')}
              editCount={props.changeLog.editCount}
              edited={false}
            />
            {props.isEditable && (
              <AutoLayout
                name="Actions"
                overflow="visible"
                spacing={GAP.md}
                width="fill-parent"
                horizontalAlignItems="end"
                verticalAlignItems="center"
              >
                <Button label="Delete" hideLabel={true} action={props.deleteChange} />
              </AutoLayout>
            )}
          </AutoLayout>
          <AutoLayout name="Changes" overflow="visible" width="fill-parent">
            {props.isEditable ? (
              <Input
                name="EditableChange"
                fill={COLOR.black}
                inputBehavior="multiline"
                inputFrameProps={{
                  fill: COLOR.white,
                }}
                onTextEditEnd={e => {
                  if (e.characters !== props.changeLog.change) {
                    props.updateChange({
                      change: e.characters,
                      editCount: props.changeLog.editCount + 1,
                      editedDate: Date.now(),
                    });
                    props.setUpdatedDate(Date.now());
                  }
                }}
                placeholder="Your update..."
                value={props.changeLog.change}
                width="fill-parent"
                lineHeight={FONT.lineHeight.lg}
                fontFamily={FONT.family}
              />
            ) : (
              <Text
                name="Change"
                fill={COLOR.black}
                lineHeight={FONT.lineHeight.lg}
                fontFamily={FONT.family}
                width={'fill-parent'}
              >
                {props.changeLog.change || '...'}
              </Text>
            )}
          </AutoLayout>
          {/* <Links name="Links" /> */}
        </AutoLayout>
      </AutoLayout>
      <Rectangle
        name="Divider"
        hidden={props.isLastRow}
        stroke={COLOR.grey}
        width="fill-parent"
        height={SPACE.one}
        strokeDashPattern={[GAP.sm, GAP.sm]}
      />
    </AutoLayout>
  );
};
