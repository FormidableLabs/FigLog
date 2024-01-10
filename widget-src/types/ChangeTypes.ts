export const ChangeTypes = ['added', 'fixed', 'changed', 'deprecated', 'removed', 'breaking', 'other'] as const;

export type ChangeType = (typeof ChangeTypes)[number];
