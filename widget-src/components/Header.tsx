import { Status } from './header/Status';
import { Meta } from './header/Meta';
import { Name } from './header/Name';
import { Description } from './header/Description';
import { COLOR, GAP, RADIUS, SPACE } from '../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Rectangle, useSyncedState } = widget;

interface HeaderProps {
  name: boolean;
  description: boolean;
  status: string;
  createdDate: number;
  updatedDate: number;
  setUpdatedDate: (updatedDate: number) => void;
  version: string;
  showVersion: boolean;
  setVersion: (updatedVersion: string) => void;
  addChange: (changeId: string) => void;
  isLocked: boolean;
  nameText: string;
  setNameText: (nameText: string) => void;
  descriptionText: string;
  setDescriptionText: (descriptionText: string) => void;
}

export const Header = ({
  name,
  description,
  status,
  createdDate,
  updatedDate,
  setUpdatedDate,
  version,
  showVersion,
  setVersion,
  addChange,
  isLocked,
  nameText,
  setNameText,
  descriptionText,
  setDescriptionText,
}: HeaderProps) => {
  // const [nameText, setNameText] = useSyncedState('nameText', '');
  // const [descriptionText, setDescriptionText] = useSyncedState('descriptionText', '');

  return (
    <AutoLayout name="Header" overflow="visible" direction="vertical" spacing={GAP.sm} width="fill-parent">
      <AutoLayout name="Container" overflow="visible" direction="vertical" width="fill-parent">
        {/* STATUS */}
        {status !== '0' && <Status status={status} />}
        {/* NAME */}
        {name && (
          <Name
            name={name}
            nameText={nameText}
            setNameText={setNameText}
            setUpdatedDate={setUpdatedDate}
            locked={isLocked}
          />
        )}
        {/* DESCRIPTION */}
        {description && (
          <Description
            description={description}
            descriptionText={descriptionText}
            setDescriptionText={setDescriptionText}
            setUpdatedDate={setUpdatedDate}
            locked={isLocked}
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
          locked={isLocked}
        />
      </AutoLayout>
      <Rectangle
        name="Divider"
        fill={COLOR.greyDark}
        strokeAlign="outside"
        width="fill-parent"
        height={SPACE.one}
        cornerRadius={RADIUS.md}
      />
    </AutoLayout>
  );
};
