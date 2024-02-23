import { ChangeType } from "./ChangeTypes"
import { LinkType } from "./LinkTypes";

export interface ChangeLog {
  createdDate: number;
  editedDate: number;
  type: ChangeType;
  user: User | null;
  change: string;
  editCount: number;
  links?: LinkType[];
  state?: {
    editing?: boolean;
    showTypeMenu?: boolean;
    link?: LinkType,
    showLinkForm?: boolean;
    linkFormError?: { label: boolean, url: boolean };
  };
}
