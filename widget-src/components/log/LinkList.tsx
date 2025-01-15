import { LinkType } from '../../types/LinkTypes';
import { Link } from './Link';

interface LinkListProps {
  links?: Array<LinkType>;
  editing?: boolean;
  deleteLink?: (linkKey: string) => void;
}

export const LinkList = ({ links, editing = false, deleteLink }: LinkListProps) => {
  return (
    <>
      {!!links && links.length > 0 && (
        <>
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
        </>
      )}
    </>
  );
};
