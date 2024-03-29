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
  createdDate: number;
  setCreatedDate: (updatedDate: number) => void;
  updatedDate: number;
  setUpdatedDate: (updatedDate: number) => void;
  version: string;
  showVersion: boolean;
  setVersion: (updatedVersion: string) => void;
  addChange: (changeId: string) => void;
}

export const Header = ({
  name,
  description,
  status,
  createdDate,
  setCreatedDate,
  updatedDate,
  setUpdatedDate,
  version,
  showVersion,
  setVersion,
  addChange,
}: HeaderProps) => {
  const [nameText, setNameText] = useSyncedState('nameText', '');
  const [descriptionText, setDescriptionText] = useSyncedState('descriptionText', '');

  return (
    <AutoLayout name="Header" overflow="visible" direction="vertical" spacing={GAP.md} width="fill-parent">
      <AutoLayout name="Container" overflow="visible" direction="vertical" width="fill-parent">
        {/* STATUS */}
        {status !== '0' && <Status status={status} />}
        {/* NAME */}
        {name && (
          <Name name={name} nameText={nameText} setNameText={setNameText} setUpdatedDate={setUpdatedDate} />
        )}
        {/* DESCRIPTION */}
        {description && (
          <Description
            description={description}
            descriptionText={descriptionText}
            setDescriptionText={setDescriptionText}
            setUpdatedDate={setUpdatedDate}
          />
        )}
        {/* META */}
        <Meta
          createdDate={createdDate}
          updatedDate={updatedDate}
          setUpdatedDate={setUpdatedDate}
          version={version}
          showVersion={showVersion}
          setVersion={setVersion}
          addChange={addChange}
        />
      </AutoLayout>
      <Rectangle name="Divider" fill={COLOR.greyDark} strokeAlign="outside" width="fill-parent" height={SPACE.one} />
    </AutoLayout>
  );
};
