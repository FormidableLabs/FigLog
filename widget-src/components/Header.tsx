import { Status } from './header/Status';
import { Meta } from './header/Meta';
import { Name } from './header/Name';
import { Description } from './header/Description';
import { COLOR, GAP, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Rectangle, useSyncedState } = widget;

interface HeaderProps {
  name: boolean;
  description: boolean;
  status: string;
  createdDate: string;
  setCreatedDate: (updatedDate: string) => void;
  updatedDate: string;
  setUpdatedDate: (updatedDate: string) => void;
  version: string;
  showVersion: boolean;
  setVersion: (updatedVersion: string) => void;
  addChange: (changeId: string) => void;
}

export const Header = (props: HeaderProps) => {
  const [nameText, setNameText] = useSyncedState('nameText', '');
  const [descriptionText, setDescriptionText] = useSyncedState('descriptionText', '');

  return (
    <AutoLayout name="Header" overflow="visible" direction="vertical" spacing={GAP.md} width="fill-parent">
      <AutoLayout name="Container" overflow="visible" direction="vertical" width="fill-parent">
        {/* STATUS */}
        {props.status !== '0' && <Status status={props.status} />}
        {/* NAME */}
        {props.name && (
          <Name name={props.name} nameText={nameText} setNameText={setNameText} setUpdatedDate={props.setUpdatedDate} />
        )}
        {/* DESCRIPTION */}
        {props.description && (
          <Description
            description={props.description}
            descriptionText={descriptionText}
            setDescriptionText={setDescriptionText}
            setUpdatedDate={props.setUpdatedDate}
          />
        )}
        {/* META */}
        <Meta
          createdDate={props.createdDate === '' ? '...' : props.createdDate}
          setCreatedDate={props.setCreatedDate}
          updatedDate={props.updatedDate === '' ? '...' : props.updatedDate}
          setUpdatedDate={props.setUpdatedDate}
          version={props.version}
          showVersion={props.showVersion}
          setVersion={props.setVersion}
          addChange={props.addChange}
        />
      </AutoLayout>
      <Rectangle name="Divider" fill={COLOR.greyDark} strokeAlign="outside" width="fill-parent" height={SPACE.one} />
    </AutoLayout>
  );
};
