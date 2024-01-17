import { ChangeType } from "./ChangeTypes"
import { Link } from "./LinkTypes";

export interface ChangeLog {
  createdDate: number;
  editedDate: number;
  type: ChangeType;
  user: User | null;
  change: string;
  editCount: number;
  showTypeMenu?: boolean;
  links?: Link[];
  tmpState?: {
    link?: Link,
    showLinkForm?: boolean;
  };
}
