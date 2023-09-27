import { ActionAddIcon } from '../../svgs/ActionAddIcon';
import { COLOR, GAP, RADIUS, PADDING, SPACE } from '../../utilities/Styles';
import { randomId } from '../../utilities/Utils';
import { MetaValue } from './MetaValue';

const { widget } = figma;
const { AutoLayout, SVG } = widget;

interface MetaProps {
  createdDate: string;
  setCreatedDate: (updatedDate: string) => void;
  updatedDate: string;
  setUpdatedDate: (updatedDate: string) => void;
  version: string;
  showVersion: boolean;
  setVersion: (updatedVersion: string) => void;
  addChange: (changeId: string) => void;
}

export const Meta = (props: MetaProps) => {
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
      <MetaValue label="Created" value={props.createdDate} />
      {/* LAST UPDATED */}
      <MetaValue label="Updated" value={props.updatedDate} />
      {/* VERSION */}
      {props.showVersion && (
        <MetaValue
          label="Version"
          value={props.version}
          setValue={props.setVersion}
          setUpdatedDate={props.setUpdatedDate}
        />
      )}
      {/* NEW */}
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
            props.addChange(changeId);
          }}
          overflow="visible"
          spacing={GAP.md}
          padding={PADDING.sm}
          horizontalAlignItems="end"
          verticalAlignItems="center"
        >
          <SVG name="Vector" height={SPACE.xs} width={SPACE.xs} src={ActionAddIcon} />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};
