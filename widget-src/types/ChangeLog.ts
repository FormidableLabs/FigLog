interface ChangeLog {
  date: string;
  time: string;
  type: ChangeType;
  user: User | null;
  change: string;
  editCount: number;
}
