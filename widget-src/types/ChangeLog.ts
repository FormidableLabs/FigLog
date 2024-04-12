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
  state?: ChangeLogState;
}

export interface ChangeLogState {
  editing?: boolean;
  showTypeMenu?: boolean;
  showLinkForm?: boolean;
  updates?: {
    createdDate?: number;
    createdDateTmp?: {
      date: { val?: string, er?: boolean },
      time: { val?: string, er?: boolean }
    };
    links?: LinkType[];
    link?: LinkType;
    linkFormError?: { label: boolean, url: boolean };
    type?: ChangeType;
    change?: string;
  }
}
