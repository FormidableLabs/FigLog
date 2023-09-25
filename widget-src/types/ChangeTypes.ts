const ChangeTypes = ['added', 'fixed', 'changed', 'depreciated', 'removed', 'breaking', 'other'] as const;

type ChangeType = (typeof ChangeTypes)[number];
