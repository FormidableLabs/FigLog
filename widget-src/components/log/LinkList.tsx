import { LinkType } from '../../types/LinkTypes';
import { PADDING, GAP } from '../../utilities/Styles';
import { Link } from './Link';

const { widget } = figma;
const { AutoLayout } = widget;

interface LinkListProps {
  links?: Array<LinkType>;
  editing?: boolean;
  deleteLink?: (linkKey: string) => void;
}

export const LinkList = ({ links, editing = false, deleteLink }: LinkListProps) => {
  return (
    <>
      {!!links && links.length > 0 && (
        <AutoLayout
          name="Log Links"
          overflow="visible"
          width="fill-parent"
          height="hug-contents"
          direction="horizontal"
          wrap
          spacing={GAP.sm}
        >
          {links.map(link => (
            <Link
              label={!!link.label ? link.label : 'Link'}
              url={!!link.url ? link.url : ''}
              key={link.key}
              icon={link.icon ? link.icon : 'link'}
              editing={editing}
              deleteLink={() => (!!deleteLink ? deleteLink(link.key) : null)}
            />
          ))}
        </AutoLayout>
      )}
    </>
  );
};
