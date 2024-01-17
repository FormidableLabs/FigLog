import { ChangeType } from "./ChangeTypes"
import { Link } from "./LinkTypes";

export interface ChangeLog {
  createdDate: number;
  editedDate: number;
  type: ChangeType;
  user: User | null;
  change: string;
  editCount: number;
  links?: Link[];
  state?: {
    showTypeMenu?: boolean;
    link?: Link,
    showLinkForm?: boolean;
  };
}
