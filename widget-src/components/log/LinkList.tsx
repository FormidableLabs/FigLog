import { LinkType } from "../../types/LinkTypes";
import { PADDING, COLOR, GAP } from "../../utilities/Styles";
import { Link } from "./Link";

const { widget} = figma;
const { AutoLayout  } = widget;

interface LinkListProps {
  links?: Array<LinkType>;
  editing: boolean;
  deleteLink: (linkKey: string) => void;
}

export const LinkList = ({
  links,
  editing,
  deleteLink,
}: LinkListProps) => {
  return(
    <>
    {!!links && links.length > 0 &&  (
      <AutoLayout
        name="Log Links"
        overflow="visible"
        width="fill-parent"
        direction="horizontal"
        wrap
        padding={{
          vertical: PADDING.sm,
        }}
        spacing={GAP.md}
      >
        {links.map((link) => (
          <Link
            label={!!link.label ? link.label : "Link"}
            url={!!link.url ? link.url : ""}
            key={link.key}
            icon={link.icon ? link.icon : "link"}
            editing={editing}
            deleteLink={() => deleteLink(link.key)}
          />
        ))}
      </AutoLayout>
    )}
    </>
  )
}