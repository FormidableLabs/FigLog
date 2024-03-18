import { isExists } from 'date-fns/isExists';
import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import {
  COLOR,
  FONT,
  GAP,
  SPACE,
  RADIUS,
  PADDING
} from '../../utilities/Styles';
import { displayDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

interface DateRangeProps {
  changeLog: ChangeLog
  timestamp: number,
  editedTimestamp: number,
  editCount: number;
  editing?: boolean;
  updateChangeState?: (changes: Partial<ChangeLogState>) => void;
}

export const DateRange = ({
  changeLog,
  timestamp,
  editedTimestamp,
  editCount,
  editing = false,
  updateChangeState
}: DateRangeProps) => {

  const createTimestamp = (mm: string, dd: string, yyyy: string) => {
    const curCreated = new Date(timestamp);
    const hours = curCreated.getHours();
    const min = curCreated.getMinutes();
    const sec = curCreated.getSeconds();

    let date = `${yyyy}-${mm}-${dd}T${hours}:${min}:${sec}`

    return Date.parse(date);
  }

  const validDate = (dateStr: string): number | undefined => {
    const dFormat = RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/g);
    const correctFormat = dFormat.test(dateStr);

    if (!correctFormat) { return undefined }

    const dateParts = dateStr.split('/');
    const month = dateParts[0];
    const day = dateParts[1];
    const year = dateParts[2];
    const exists = isExists(parseInt(year), parseInt(month), parseInt(day));

    if (!exists) { return undefined }

    const newDate = createTimestamp(month, day, year);
    if (newDate <= Date.now()) {
      return newDate;
    }
    return undefined;
  }

  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.md} verticalAlignItems="center">
      {editing ? (
        <>
          <AutoLayout
            name="Input Wrapper"
            overflow="visible"
          >
            <Input
              name="Editable Date"
              fill={COLOR.black}
              inputBehavior="truncate"
              inputFrameProps={{
                fill: COLOR.white,
                stroke: !!changeLog.state?.updates?.createdDateError?.er ? COLOR.red : COLOR.grey,
                strokeWidth: SPACE.one,
                cornerRadius: RADIUS.xs,
                padding: { horizontal: PADDING.xs, vertical: PADDING.xs },
              }}
              placeholder={displayDate(timestamp, 'date')}
              value={changeLog.state?.updates?.createdDateError?.tmp || displayDate(timestamp, 'date')}
              lineHeight={FONT.lineHeight.sm}
              fontFamily={FONT.family}
              fontSize={FONT.size.sm}
              letterSpacing={FONT.letterSpacing.sm}
              fontWeight={FONT.weight.bold}
              textCase="upper"
              width={SPACE.md - SPACE.xs}
              onTextEditEnd={e => {
                const newCreated = validDate(e.characters);
                if (!!updateChangeState) {
                  switch (newCreated) {
                    case undefined:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDateError: { er: true, tmp: e.characters },
                        }
                      })
                      break;
                    default:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDate: newCreated,
                          createdDateError: { er: false, tmp: undefined },
                        }
                      })
                      break;
                  }
                }
              }}
            />
            {!!changeLog.state?.updates?.createdDateError?.er && (
              <Text
              fill={COLOR.red}
              fontSize={FONT.size.xs}
              fontFamily={FONT.family}
              positioning="absolute"
              y={{ type: 'top', offset: FONT.lineHeight.xs + PADDING.xs*2 + PADDING.sm }}
            >
              A valid past date in MM/DD/YYYY format is required.
            </Text>
            )}
          </AutoLayout>
          <Text
            name="Created Time"
            fill={COLOR.black}
            lineHeight={FONT.lineHeight.sm}
            fontFamily={FONT.family}
            fontSize={FONT.size.sm}
            letterSpacing={FONT.letterSpacing.sm}
            fontWeight={FONT.weight.bold}
            textCase="upper"
            hidden={timestamp === undefined}
          >
            @ {displayDate(timestamp, 'time')}
          </Text>
        </>
      ) : (
        <>
          <Text
            name="Created"
            fill={COLOR.black}
            lineHeight={FONT.lineHeight.sm}
            fontFamily={FONT.family}
            fontSize={FONT.size.sm}
            letterSpacing={FONT.letterSpacing.sm}
            fontWeight={FONT.weight.bold}
            textCase="upper"
            hidden={timestamp === undefined}
          >
            {displayDate(timestamp, 'datetime')}
          </Text>
          {editCount >= 2 && (
            <Text
              name="Edited"
              fill={COLOR.greyDark}
              lineHeight={FONT.lineHeight.xs}
              fontFamily={FONT.family}
              fontSize={FONT.size.xs}
              letterSpacing={FONT.letterSpacing.sm}
            >
              {`EDITED ${displayDate(editedTimestamp, 'datetime')}`}
            </Text>
          )}
        </>
      )}
    </AutoLayout>
  );
};
