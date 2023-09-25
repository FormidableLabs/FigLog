const StatusTypes = ['none', 'proposed', 'draft', 'beta', 'released', 'deprecated', 'archived'] as const;

type StatusType = (typeof StatusTypes)[number];
