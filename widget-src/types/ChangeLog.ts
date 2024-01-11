import { ChangeType } from "./ChangeTypes"

export interface ChangeLog {
  createdDate: number;
  editedDate: number;
  type: ChangeType;
  user: User | null;
  change: string;
  editCount: number;
  showTypeMenu?: boolean;
}
