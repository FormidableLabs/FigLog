import { ActionAddIcon } from '../../svgs/ActionAddIcon';
import { ActionLockIcon } from '../../svgs/ActionLockIcon';
import { COLOR, GAP, RADIUS, PADDING, SPACE } from '../../utilities/Styles';
import { randomId, displayDate } from '../../utilities/Utils';
import { MetaValue } from './MetaValue';

const { currentUser, widget } = figma;
const { AutoLayout, SVG } = widget;

interface MetaProps {
  createdDate: number;
  updatedDate: number;
  setUpdatedDate: (updatedDate: number) => void;
  version: string;
  showVersion: boolean;
  setVersion: (updatedVersion: string) => void;
  addChange: (changeId: string) => void;
  locked: boolean;
}

export const Meta = ({
  createdDate,
  updatedDate,
  setUpdatedDate,
  version,
  showVersion,
  setVersion,
  addChange,
  locked,
}: MetaProps) => {
  return (
    <AutoLayout
      name="MetaWrapper"
      overflow="visible"
      spacing={GAP.xl}
      padding={{
        top: PADDING.sm,
        right: PADDING.none,
        bottom: PADDING.none,
        left: PADDING.none,
      }}
      width="fill-parent"
      verticalAlignItems="center"
    >
      {/* LOGGING SINCE */}
      <MetaValue label="Created" value={displayDate(createdDate, 'datetime')} locked={locked} />
      {/* LAST UPDATED */}
      {updatedDate !== createdDate && (
        <MetaValue label="Updated" value={displayDate(updatedDate, 'datetime')} locked={locked} />
      )}
      {/* VERSION */}
      {showVersion && (
        <MetaValue
          label="Version"
          value={version}
          setValue={setVersion}
          setUpdatedDate={setUpdatedDate}
          locked={locked}
        />
      )}
      {/* NEW */}
      {currentUser && (
        <AutoLayout
          name="Actions"
          overflow="visible"
          width={'fill-parent'}
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          {locked ? (
            <AutoLayout
              name="Locked Widget"
              cornerRadius={RADIUS.sm}
              fill={COLOR.white}
              overflow="visible"
              spacing={GAP.sm}
              padding={PADDING.xs}
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              <SVG name="Lock" height={SPACE.sm} width={SPACE.sm} src={<ActionLockIcon color={COLOR.grey} />} />
            </AutoLayout>
          ) : (
            <AutoLayout
              name="NewLog"
              cornerRadius={RADIUS.sm}
              fill={COLOR.white}
              hoverStyle={{ fill: COLOR.grey }}
              onClick={() => {
                const changeId = randomId();
                addChange(changeId);
              }}
              overflow="visible"
              spacing={GAP.sm}
              padding={PADDING.xs}
              horizontalAlignItems="end"
              verticalAlignItems="center"
            >
              <SVG name="Add" height={SPACE.sm} width={SPACE.sm} src={<ActionAddIcon />} />
            </AutoLayout>
          )}
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
