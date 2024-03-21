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

  type datePieces = {
    mm?: string,
    dd?: string,
    yyyy?: string,
    hour?: string,
    min?: string,
    sec?: string,
    ampm?: string
  }
  const createTimestamp = ({mm, dd, yyyy, hour, min, sec, ampm}: datePieces) => {
    const curTimestamp = new Date(timestamp);
    if (!(!!mm || !!dd || !!yyyy)) {
      const tmpDateStr = changeLog.state?.updates?.createdDateTmp?.date.val;
      switch (tmpDateStr) {
        case undefined:
          mm = (curTimestamp.getMonth() + 1).toString();
          dd = curTimestamp.getDate().toString();
          yyyy = curTimestamp.getFullYear().toString();
          break;
        default:
          mm = tmpDateStr.split("/")[0];
          dd = tmpDateStr.split("/")[1];
          yyyy = tmpDateStr.split("/")[2];
      }
    }
    if (!(!!hour || !!min || !!sec)) {
      let tmpTimeStr = changeLog.state?.updates?.createdDateTmp?.time.val;
      switch (tmpTimeStr) {
        case undefined:
          hour = curTimestamp.getHours().toString();
          min = curTimestamp.getMinutes().toString();
          sec = curTimestamp.getSeconds().toString();
          break;
        default:
          ampm = tmpTimeStr.slice(-2);
          tmpTimeStr = tmpTimeStr.slice(0, -2);
          hour = tmpTimeStr.split(":")[0];
          min = tmpTimeStr.split(":")[1];
          sec = tmpTimeStr.split(":")[2];
          break;
        }
      }
      if (!!hour && !!ampm) {
        if (ampm.toLowerCase() === "pm") {
          hour = (parseInt(hour) + 12).toString();
        }
      }


    let date = `${yyyy}-${mm}-${dd}T${hour}:${min}:${sec}`
    return Date.parse(date);
  }

  const validDate = (dateStr: string): number | undefined => {
    const dFormat = RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g);
    const correctFormat = dFormat.test(dateStr);
    if (!correctFormat) { return undefined }

    const dateParts = dateStr.split('/');
    const month = dateParts[0];
    const day = dateParts[1];
    const year = dateParts[2];
    const exists = isExists(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (!exists) { return undefined }

    const newDate = createTimestamp({mm: month, dd: day, yyyy: year});
    if (newDate <= Date.now()) {
      return newDate;
    }
    return undefined;
  }

  const validTime = (timeStr: string): number | undefined => {
    timeStr = timeStr.trim().toLowerCase();
    const tFormat = RegExp(/^(\d{1,2}):(\d{1,2}):(\d{1,2})(\s)?(am|pm)$/gi);
    const correctFormat = tFormat.test(timeStr);
    if (!correctFormat) { return undefined };

    const ampm = timeStr.slice(-2);
    timeStr = timeStr.slice(0, -2);
    const timeParts = timeStr.split(":");
    const hour = parseInt(timeParts[0]);
    const min = parseInt(timeParts[1]);
    const sec = parseInt(timeParts[2]);
    const hValid = hour > 0 && hour <= 12;
    const mValid = min >= 0 && min < 60;
    const sValid = sec >= 0 && sec < 60;

    

    const tValid = hValid && mValid && sValid;
    if (!tValid) { return undefined };

    return createTimestamp({hour: hour.toString(), min: min.toString(), sec: sec.toString(), ampm: ampm});
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
                stroke: !!changeLog.state?.updates?.createdDateTmp?.date.er ? COLOR.red : COLOR.grey,
                strokeWidth: SPACE.one,
                cornerRadius: RADIUS.xs,
                padding: { horizontal: PADDING.xs, vertical: PADDING.xs },
              }}
              placeholder={changeLog.state?.updates?.createdDateTmp?.date.val || displayDate(timestamp, 'date')}
              value={changeLog.state?.updates?.createdDateTmp?.date.val || displayDate(timestamp, 'date')}
              lineHeight={FONT.lineHeight.sm}
              fontFamily={FONT.family}
              fontSize={FONT.size.sm}
              letterSpacing={FONT.letterSpacing.sm}
              fontWeight={FONT.weight.bold}
              textCase="upper"
              width={SPACE.md - SPACE.xs - SPACE.xxxs}
              onTextEditEnd={e => {
                const newCreated = validDate(e.characters);
                if (!!updateChangeState) {
                  switch (newCreated) {
                    case undefined:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDateTmp: {
                            date: {
                              val: e.characters,
                              er: true,
                            },
                            time: {
                              val: changeLog.state?.updates?.createdDateTmp?.time?.val,
                              er: changeLog.state?.updates?.createdDateTmp?.time?.er,
                            }
                          },
                        }
                      })
                      break;
                    default:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDate: newCreated,
                          createdDateTmp: {
                            date: {
                              val: e.characters,
                              er: false,
                            },
                            time: {
                              val: changeLog.state?.updates?.createdDateTmp?.time?.val,
                              er: changeLog.state?.updates?.createdDateTmp?.time?.er,
                            }
                          },
                        }
                      })
                      break;
                  }
                }
              }}
            />
            {!!changeLog.state?.updates?.createdDateTmp?.date.er && (
              <Text
              fill={COLOR.red}
              fontSize={FONT.size.xs}
              fontFamily={FONT.family}
              positioning="absolute"
              y={{ type: 'top', offset: FONT.lineHeight.xs + PADDING.xs*2 + PADDING.sm }}
              x={{ type: 'right', offset: 0 }}
            >
              A valid past date in MM/DD/YYYY format is required.
            </Text>
            )}
          </AutoLayout>
          <Text
            name="@"
            fill={COLOR.black}
            lineHeight={FONT.lineHeight.sm}
            fontFamily={FONT.family}
            fontSize={FONT.size.sm}
            letterSpacing={FONT.letterSpacing.sm}
            fontWeight={FONT.weight.bold}
            textCase="upper"
            hidden={timestamp === undefined}
          >
            @
          </Text>
          <AutoLayout
            name="Input Wrapper"
            overflow="visible"
          >
            <Input
              name="Editable Time"
              fill={COLOR.black}
              inputBehavior="truncate"
              inputFrameProps={{
                fill: COLOR.white,
                stroke: !!changeLog.state?.updates?.createdDateTmp?.time.er ? COLOR.red : COLOR.grey,
                strokeWidth: SPACE.one,
                cornerRadius: RADIUS.xs,
                padding: { horizontal: PADDING.xs, vertical: PADDING.xs },
              }}
              placeholder={changeLog.state?.updates?.createdDateTmp?.time.val || displayDate(timestamp, 'time')}
              value={changeLog.state?.updates?.createdDateTmp?.time.val || displayDate(timestamp, 'time')}
              lineHeight={FONT.lineHeight.sm}
              fontFamily={FONT.family}
              fontSize={FONT.size.sm}
              letterSpacing={FONT.letterSpacing.sm}
              fontWeight={FONT.weight.bold}
              textCase="upper"
              width={SPACE.md - SPACE.xs}
              onTextEditEnd={e => {
                const newCreated = validTime(e.characters);
                if (!!updateChangeState) {
                  switch (newCreated) {
                    case undefined:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDateTmp: {
                            date: {
                              val: changeLog.state?.updates?.createdDateTmp?.date?.val,
                              er: changeLog.state?.updates?.createdDateTmp?.date?.er,
                            },
                            time: {
                              val: e.characters,
                              er: true,
                            }
                          },
                        }
                      })
                      break;
                    default:
                      updateChangeState({
                        ...changeLog.state,
                        updates: {
                          ...changeLog.state?.updates,
                          createdDate: newCreated,
                          createdDateTmp: {
                            date: {
                              val: changeLog.state?.updates?.createdDateTmp?.date?.val,
                              er: changeLog.state?.updates?.createdDateTmp?.date?.er,
                            },
                            time: {
                              val: e.characters,
                              er: false,
                            }
                          },
                        }
                      })
                      break;
                  }
                }
              }}
            />
            {!!changeLog.state?.updates?.createdDateTmp?.time.er && (
              <Text
              fill={COLOR.red}
              fontSize={FONT.size.xs}
              fontFamily={FONT.family}
              positioning="absolute"
              y={{ type: 'top', offset: FONT.lineHeight.xs + PADDING.xs*2 + PADDING.sm }}
            >
              A valid time in 12 hour "HH:mm:ss a" format is required.
            </Text>
            )}
          </AutoLayout>
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
