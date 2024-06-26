import { isExists } from 'date-fns/isExists';
import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, SPACE } from '../../utilities/Styles';
import { InputField } from '../InputField';
import { displayDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface DateRangeFormProps {
  changeLog: ChangeLog;
  timestamp: number;
  updateChangeState?: (changes: Partial<ChangeLogState>) => void;
}

export const DateRangeForm = ({ changeLog, timestamp, updateChangeState }: DateRangeFormProps) => {
  type datePieces = {
    mm?: string;
    dd?: string;
    yyyy?: string;
    hour?: string;
    min?: string;
    sec?: string;
    ampm?: string;
  };

  const createTimestamp = ({ mm, dd, yyyy, hour, min, sec, ampm }: datePieces) => {
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
          mm = tmpDateStr.split('/')[0];
          dd = tmpDateStr.split('/')[1];
          yyyy = tmpDateStr.split('/')[2];
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
          hour = tmpTimeStr.split(':')[0];
          min = tmpTimeStr.split(':')[1];
          sec = tmpTimeStr.split(':')[2];
          break;
      }
    }
    if (!!hour && !!ampm) {
      if (ampm.toLowerCase() === 'pm') {
        hour = (parseInt(hour) + 12).toString();
      }
    }

    let date = `${yyyy}-${mm}-${dd}T${hour}:${min}:${sec}`;
    return Date.parse(date);
  };

  const validDate = (dateStr: string): number | undefined => {
    const dFormat = RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g);
    const correctFormat = dFormat.test(dateStr);
    if (!correctFormat) {
      return undefined;
    }

    const dateParts = dateStr.split('/');
    const month = dateParts[0];
    const day = dateParts[1];
    const year = dateParts[2];
    const exists = isExists(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (!exists) {
      return undefined;
    }

    const newDate = createTimestamp({ mm: month, dd: day, yyyy: year });
    if (newDate <= Date.now()) {
      return newDate;
    }
    return undefined;
  };

  const validTime = (timeStr: string): number | undefined => {
    timeStr = timeStr.trim().toLowerCase();
    const tFormat = RegExp(/^(\d{1,2}):(\d{1,2}):(\d{1,2})(\s)?(am|pm)$/gi);
    const correctFormat = tFormat.test(timeStr);
    if (!correctFormat) {
      return undefined;
    }

    const ampm = timeStr.slice(-2);
    timeStr = timeStr.slice(0, -2);
    const timeParts = timeStr.split(':');
    const hour = parseInt(timeParts[0]);
    const min = parseInt(timeParts[1]);
    const sec = parseInt(timeParts[2]);
    const hValid = hour > 0 && hour <= 12;
    const mValid = min >= 0 && min < 60;
    const sValid = sec >= 0 && sec < 60;

    const tValid = hValid && mValid && sValid;
    if (!tValid) {
      return undefined;
    }

    return createTimestamp({ hour: hour.toString(), min: min.toString(), sec: sec.toString(), ampm: ampm });
  };

  return (
    <AutoLayout name="Log Date" overflow="visible" spacing={GAP.sm} verticalAlignItems="center">
      <InputField
        name="Editable Date"
        placeholder={changeLog.state?.updates?.createdDateTmp?.date.val || displayDate(timestamp, 'date')}
        value={changeLog.state?.updates?.createdDateTmp?.date.val || displayDate(timestamp, 'date')}
        width={SPACE.md}
        isRequired={true}
        behavior="truncate"
        fontWeight={FONT.weight.bold}
        letterSpacing={FONT.letterSpacing.sm}
        textCase="upper"
        isAbsolutePos={true}
        hasError={!!changeLog.state?.updates?.createdDateTmp?.date.er}
        errorMessage="Enter past date (MM/DD/YYYY)."
        errorPosition="right"
        action={date => {
          const newCreated = validDate(date);
          if (!!updateChangeState) {
            switch (newCreated) {
              case undefined:
                updateChangeState({
                  ...changeLog.state,
                  updates: {
                    ...changeLog.state?.updates,
                    createdDateTmp: {
                      date: {
                        val: date,
                        er: true,
                      },
                      time: {
                        val: changeLog.state?.updates?.createdDateTmp?.time?.val,
                        er: changeLog.state?.updates?.createdDateTmp?.time?.er,
                      },
                    },
                  },
                });
                break;
              default:
                updateChangeState({
                  ...changeLog.state,
                  updates: {
                    ...changeLog.state?.updates,
                    createdDate: newCreated,
                    createdDateTmp: {
                      date: {
                        val: date,
                        er: false,
                      },
                      time: {
                        val: changeLog.state?.updates?.createdDateTmp?.time?.val,
                        er: changeLog.state?.updates?.createdDateTmp?.time?.er,
                      },
                    },
                  },
                });
                break;
            }
          }
        }}
      />
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
      <InputField
        name="Editable Time"
        placeholder={changeLog.state?.updates?.createdDateTmp?.time.val || displayDate(timestamp, 'time')}
        value={changeLog.state?.updates?.createdDateTmp?.time.val || displayDate(timestamp, 'time')}
        width={SPACE.md}
        isRequired={true}
        behavior="truncate"
        fontWeight={FONT.weight.bold}
        letterSpacing={FONT.letterSpacing.sm}
        textCase="upper"
        isAbsolutePos={true}
        hasError={!!changeLog.state?.updates?.createdDateTmp?.time.er}
        errorMessage="Enter time (HH:MM:SS AM/PM)."
        action={time => {
          const newCreated = validTime(time);
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
                        val: time,
                        er: true,
                      },
                    },
                  },
                });
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
                        val: time,
                        er: false,
                      },
                    },
                  },
                });
                break;
            }
          }
        }}
      />
    </AutoLayout>
  );
};
