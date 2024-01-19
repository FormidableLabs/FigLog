export const ChangeTypes = ['none', 'added', 'fixed', 'changed', 'deprecated', 'removed', 'breaking', 'other'] as const;

export type ChangeType = (typeof ChangeTypes)[number];
