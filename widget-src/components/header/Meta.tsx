import { ActionAddIcon } from '../../svgs/ActionAddIcon';
import { COLOR, GAP, RADIUS, PADDING, SPACE } from '../../utilities/Styles';
import { randomId, formatDate } from '../../utilities/Utils';
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
}

export const Meta = ({
  createdDate,
  updatedDate,
  setUpdatedDate,
  version,
  showVersion,
  setVersion,
  addChange
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
      <MetaValue label="Created" value={formatDate(createdDate, 'datetime')} />
      {/* LAST UPDATED */}
      {updatedDate !== createdDate && (
        <MetaValue label="Updated" value={formatDate(updatedDate, 'datetime')} />
      )}
      {/* VERSION */}
      {showVersion && (
        <MetaValue
          label="Version"
          value={version}
          setValue={setVersion}
          setUpdatedDate={setUpdatedDate}
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
            spacing={GAP.md}
            padding={PADDING.xs}
            horizontalAlignItems="end"
            verticalAlignItems="center"
          >
            <SVG name="Vector" height={SPACE.sm} width={SPACE.sm} src={<ActionAddIcon />} />
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  );
};
