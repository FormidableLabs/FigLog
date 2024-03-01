import { COLOR, FONT, RADIUS, PADDING, SPACE, GAP } from '../../utilities/Styles';
import { ChangeType } from '../../types/ChangeTypes'
import { Check } from '../../svgs/Check';
import { ActionAddIcon } from '../../svgs/ActionAddIcon';
import { TypeMenu } from './TypeMenu';
import { ChangeLog } from '../../types/ChangeLog';
import { Type } from './Type';


interface TypeDisplayProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void; // update this change log
  updateOthers: (changes: Partial<ChangeLog>) => void; // update all other change logs  // FIX: not sure we still need this with editing flow
}

export const TypeDisplay = ({
  changeLog,
  updateChange,
  updateOthers,
}: TypeDisplayProps) => {

  switch (true) {
    case !!changeLog.state?.editing:
      return (
        <>
          {!!changeLog.state?.showTypeMenu && (
            <TypeMenu
              currentType={changeLog.type === 'added' ? 'none' : changeLog.type}
              selectType={(newType) => {

                // const addEdit = changeLog.type !== 'none' && changeLog.type !== 'added';

                if (newType !== changeLog.type) {
                    updateChange({
                      type: newType,
                      // editCount: addEdit ? changeLog.editCount + 1 : changeLog.editCount, // FIX: editing changes on editing submit
                      // editedDate: addEdit ? Date.now() : changeLog.editedDate,
                      state: {
                        ...changeLog.state,
                        showTypeMenu: !changeLog.state?.showTypeMenu,
                      },
                    });
                    // setUpdatedDate(Date.now());  // FIX: do this on editing state submit...
                } else {
                  updateChange({
                    state: {
                      ...changeLog.state,
                      showTypeMenu: !changeLog.state?.showTypeMenu,
                    },
                  })
                }
              }}
            />
          )}
          <Type
            type={changeLog.type} 
            action={() => {
              // toggle log type menu
              updateChange({
                state: {
                  ...changeLog.state,
                  showTypeMenu: !changeLog.state?.showTypeMenu,
                }
              })
              // hide all other log type menues - FIX: probably not needed with editing state....
              // updateOthers({
              //   state: {
              //     ...changeLog.state,
              //     showTypeMenu: false,
              //   }
              // })
            }}
          />
        </>
      );
    case changeLog.type !== ('none' || 'added'):
      return ( <Type type={changeLog.type} />);
    default:
      return (<></>);
  }
}