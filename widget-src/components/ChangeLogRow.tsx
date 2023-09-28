import { Button } from './Button';
import { User } from './log/User';
import { Date } from './log/Date';
// import { Type } from './log/Type';
import { getDate, getTime } from '../utilities/Utils';
import { COLOR, FONT, GAP, PADDING, SPACE } from '../utilities/Styles';

const { currentUser, widget } = figma;
const { AutoLayout, Input, Rectangle, Text } = widget;

interface ChangeLogRowProps {
  changeLogId: string;
  changeLog: ChangeLog;
  isLastRow: boolean;
  updateChange: (changes: Partial<ChangeLog>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: string) => void;
}

export const ChangeLogRow = (props: ChangeLogRowProps) => {
  console.log('ChangeLogRow', props.changeLog);

  const changeOwner = props.changeLog.user?.id === currentUser?.id;

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

            <Date
              time={props.changeLog.time}
              date={props.changeLog.date}
              editCount={props.changeLog.editCount}
              edited={false}
            />
            <AutoLayout
              name="Actions"
              overflow="visible"
              spacing={GAP.md}
              width="fill-parent"
              horizontalAlignItems="end"
              verticalAlignItems="center"
              hidden={!changeOwner}
            >
              {/* <Button label="Edit" hideLabel={true} /> */}
              <Button label="Delete" hideLabel={true} action={props.deleteChange} />
            </AutoLayout>
          </AutoLayout>
          <AutoLayout name="Changes" overflow="visible" width="fill-parent">
            {changeOwner ? (
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
                      date: getDate(),
                      time: getTime(),
                    });
                    props.setUpdatedDate(getDate());
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
