import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { COLOR, FONT, GAP, PADDING } from '../../utilities/Styles';
import { DateRangeForm } from './DateRangeForm';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { LinkList } from './LinkList';
import { Type } from './Type';
import { TypeMenu } from './TypeMenu';
import { LinkForm } from './LinkForm';
import { AddLink } from './AddLink';
import { ActionCloseIcon } from '../../svgs/ActionCloseIcon';
import { displayDate } from '../../utilities/Utils';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface ChangeLogEditingProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
  deleteChange: () => void;
  setUpdatedDate: (updatedDate: number) => void;
  showTypes: boolean;
  isLastRow: boolean;
}

export const ChangeLogEditing = ({
  changeLog,
  updateChange,
  updateChangeState,
  deleteChange,
  setUpdatedDate,
  showTypes,
  isLastRow,
}: ChangeLogEditingProps) => {
  return (
    <AutoLayout
      name="ChangeLog Content"
      overflow="visible"
      direction="vertical"
      spacing={GAP.lg}
      padding={{
        top: PADDING.xl,
        bottom: isLastRow ? PADDING.xxs : PADDING.xl,
        horizontal: PADDING.none,
      }}
      width="fill-parent"
    >
      <AutoLayout
        name="Meta"
        overflow="visible"
        spacing={GAP.sm}
        padding={{
          top: PADDING.none,
          right: PADDING.xxs,
          bottom: PADDING.none,
          left: PADDING.none,
        }}
        width="fill-parent"
        verticalAlignItems="center"
      >
        {showTypes && (
          <>
            {!!changeLog.state?.showTypeMenu && (
              <TypeMenu
                currentType={!!changeLog.state?.updates?.type ? changeLog.state?.updates?.type : changeLog.type}
                selectType={newType => {
                  updateChangeState({
                    ...changeLog.state,
                    showTypeMenu: !changeLog.state?.showTypeMenu,
                    updates: {
                      ...changeLog.state?.updates,
                      type: newType !== changeLog.type ? newType : changeLog.type,
                    },
                  });
                }}
              />
            )}
            <AutoLayout
              name="Action Wrapper"
              onClick={() => {
                updateChangeState({
                  ...changeLog.state,
                  showTypeMenu: !changeLog.state?.showTypeMenu,
                });
              }}
              width="hug-contents"
              positioning="auto"
            >
              <Type type={!!changeLog.state?.updates?.type ? changeLog.state?.updates?.type : changeLog.type} />
            </AutoLayout>
          </>
        )}
        <Text
          name="Name"
          fill={COLOR.black}
          lineHeight={FONT.lineHeight.sm}
          fontFamily={FONT.family}
          fontSize={FONT.size.sm}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.bold}
          textCase="upper"
        >
          {changeLog.user?.name || ''}
        </Text>

        <DateRangeForm
          changeLog={changeLog}
          timestamp={changeLog.state?.updates?.createdDate || changeLog.createdDate}
          updateChangeState={updateChangeState}
        />
        <AutoLayout
          name="Actions"
          overflow="visible"
          spacing={GAP.sm}
          width="fill-parent"
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <AutoLayout spacing={GAP.sm}>
            <Button
              label={
                !!changeLog.state?.updates?.createdDateTmp?.date.er ||
                !!changeLog.state?.updates?.createdDateTmp?.time.er ||
                !!changeLog.state?.updates?.linkFormError?.label ||
                !!changeLog.state?.updates?.linkFormError?.url
                  ? 'Fix Error to Save'
                  : 'Save Log'
              }
              error={
                !!changeLog.state?.updates?.createdDateTmp?.date.er ||
                !!changeLog.state?.updates?.createdDateTmp?.time.er ||
                !!changeLog.state?.updates?.linkFormError?.label ||
                !!changeLog.state?.updates?.linkFormError?.url
              }
              action={() => {
                if (
                  !(
                    !!changeLog.state?.updates?.createdDateTmp?.date.er &&
                    !!changeLog.state?.updates?.createdDateTmp?.time.er &&
                    !!changeLog.state?.updates?.linkFormError?.label &&
                    !!changeLog.state?.updates?.linkFormError?.url
                  )
                ) {
                  const saveCreatedDate = changeLog.state?.updates?.createdDate || changeLog.createdDate;
                  const saveType = changeLog.state?.updates?.type || changeLog.type;
                  const saveChange = changeLog.state?.updates?.change || '';
                  const saveLinks =
                    changeLog.links && changeLog.state?.updates?.links
                      ? changeLog.links.concat(changeLog.state?.updates?.links)
                      : changeLog.state?.updates?.links;

                  updateChange({
                    createdDate: saveCreatedDate,
                    editedDate: Date.now(),
                    type: saveType,
                    change: saveChange,
                    links: saveLinks,
                    editCount: ++changeLog.editCount,
                    state: {
                      ...changeLog.state,
                      editing: false,
                      updates: {
                        ...changeLog.state?.updates,
                        links: [],
                      },
                    },
                  });
                  setUpdatedDate(Date.now());
                }
              }}
            />
            {changeLog.editCount > 0 && (
              <Button
                label="Cancel"
                hideLabel
                iconSrc={<ActionCloseIcon color={COLOR.greyDark} />}
                action={() => {
                  updateChangeState({
                    ...changeLog.state,
                    editing: false,
                    showLinkForm: false,
                    updates: {
                      createdDate: changeLog.createdDate,
                      createdDateTmp: {
                        date: {
                          val: displayDate(changeLog.createdDate, 'date'),
                          er: false,
                        },
                        time: {
                          val: displayDate(changeLog.createdDate, 'time'),
                          er: false,
                        },
                      },
                      links: [],
                      link: {
                        label: '',
                        url: '',
                        icon: '',
                        key: '',
                      },
                      type: changeLog.type,
                      change: changeLog.change,
                      linkFormError: { label: false, url: false },
                    },
                  });
                }}
              />
            )}
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout name="Changes" overflow="visible" width="fill-parent">
        <InputField
          name="EditableChange"
          placeholder="Your Update..."
          value={changeLog.state?.updates?.change || ''}
          large={true}
          behavior="multiline"
          action={val => {
            updateChangeState({
              ...changeLog.state,
              updates: {
                ...changeLog.state?.updates,
                change: val,
              },
            });
          }}
        />
      </AutoLayout>
      {((!!changeLog.links && changeLog.links.length > 0) ||
        (!!changeLog.state?.updates?.links && changeLog.state?.updates?.links.length > 0)) && (
        <AutoLayout
          name="Links"
          overflow="visible"
          width="fill-parent"
          height="hug-contents"
          direction="horizontal"
          wrap
          spacing={GAP.sm}
        >
          <LinkList
            links={changeLog.links ? changeLog.links : []}
            editing={true}
            deleteLink={linkToDelete => {
              updateChange({
                ...changeLog.state,
                links: changeLog.links ? changeLog.links.filter(link => link.key !== linkToDelete) : [],
              });
            }}
          />

          <LinkList
            links={changeLog.state?.updates?.links ? changeLog.state?.updates?.links : []}
            editing={true}
            deleteLink={linkToDelete => {
              updateChangeState({
                ...changeLog.state,
                updates: {
                  ...changeLog.state?.updates,
                  links: changeLog.state?.updates?.links
                    ? changeLog.state?.updates?.links.filter(link => link.key !== linkToDelete)
                    : [],
                },
              });
            }}
          />
        </AutoLayout>
      )}
      <AutoLayout name="Actions" width="fill-parent" direction="vertical" spacing={GAP.sm}>
        <AutoLayout name="Add Link" width="fill-parent" horizontalAlignItems="end" verticalAlignItems="center">
          {!!changeLog.state?.showLinkForm ? (
            <LinkForm changeLog={changeLog} updateChangeState={updateChangeState} setUpdatedDate={setUpdatedDate} />
          ) : (
            <AddLink changeLog={changeLog} updateChangeState={updateChangeState} />
          )}
        </AutoLayout>
        <AutoLayout name="Delete Log" width="fill-parent" horizontalAlignItems="start" verticalAlignItems="center">
          <Button label="Delete Log" action={deleteChange} />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
