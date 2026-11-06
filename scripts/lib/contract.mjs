// Shared constants for the repo contract.

export const CORE_SKILLS = [
  'egm-mode',
  'egm-ask',
  'egm-setup',
  'egm-brainstorm',
  'egm-draft',
  'egm-review',
  'egm-resolve',
  'egm-drift',
];

export const EXTENDED_SKILLS = [
  'delegate',
  'rules',
  'how',
  'why',
  'arena',
  'swarm',
  'tdd',
  'no-comments',
  'reflect',
  'unslop',
  'technical-writing',
  'ste100',
  'statechart',
];

export const DOMAIN_SKILLS = ['ddd'];
export const EXPERIMENTAL_SKILLS = ['egm-bootstrap'];

export const LINE_BUDGETS = {
  'egm-mode': 320,
  'egm-ask': 110,
  'egm-setup': 140,
  'egm-brainstorm': 120,
  'egm-draft': 140,
  'egm-review': 220,
  'egm-resolve': 110,
  'egm-drift': 80,
  delegate: 130,
  rules: 100,
  how: 55,
  why: 120,
  arena: 60,
  swarm: 55,
  tdd: 50,
  'no-comments': 60,
  reflect: 120,
  unslop: 100,
  'technical-writing': 110,
  ste100: 110,
  statechart: 100,
  ddd: 130,
  'egm-bootstrap': 140,
};

export const PRINCIPLE_BUDGET = 30;
export const PLAYBOOK_BUDGET = 45;
export const AGENT_BUDGET = 110;
export const STANDARD_BUDGET = 70;

export const PLAYBOOKS = [
  'investigation',
  'feature',
  'bug-fix',
  'refactoring',
  'prototype',
  'review-only',
  'drift-maintenance',
  'opening-a-pr',
  'ddd-model',
  'ddd-review',
  'ddd-modernize',
  'orchestrate',
];

export const MODEL_ROLES = [
  'egm drafting',
  'egm reviewers',
  'egm synthesizer',
  'egm delivery',
  'egm judgment and prose',
  'egm hardest tasks',
  'egm verification',
  'delegate workers',
  'how explorer',
  'how explainer',
  'why investigators',
  'why synthesizer',
  'reflect reviewers',
  'reflect synthesizer',
  'arena runners',
  'arena cross-judge pool',
  'swarm workers',
];

export const RULE_PACKS = [
  'a-philosophy-of-software-design',
  'clean-architecture',
  'clean-code',
  'code-complete',
  'designing-data-intensive-applications',
  'domain-driven-design',
  'domain-driven-design-distilled',
  'implementing-domain-driven-design',
  'patterns-of-enterprise-application-architecture',
  'refactoring',
  'refactoring-guru',
  'release-it',
  'the-pragmatic-programmer',
  'working-effectively-with-legacy-code',
];

export const PRINCIPLE_GROUPS = {
  Core: [
    'laziness-protocol',
    'foundational-thinking',
    'redesign-from-first-principles',
    'attack-the-premise',
    'subtract-before-you-add',
    'minimize-reader-load',
    'outcome-oriented-execution',
    'experience-first',
    'exhaust-the-design-space',
    'build-the-lever',
  ],
  Architecture: [
    'model-the-domain',
    'boundary-discipline',
    'type-system-discipline',
    'make-operations-idempotent',
    'migrate-callers-then-delete-legacy-apis',
    'separate-before-serializing-shared-state',
  ],
  Verification: [
    'prove-it-works',
    'fix-root-causes',
    'sequence-verifiable-units',
    'test-behavior-not-implementation',
    'explain-the-number',
  ],
  Delegation: ['guard-the-context-window', 'never-block-on-the-human'],
  Meta: ['encode-lessons-in-structure'],
};

export const PRINCIPLE_TITLES = {
  'laziness-protocol': 'Laziness Protocol',
  'foundational-thinking': 'Foundational Thinking',
  'redesign-from-first-principles': 'Redesign from First Principles',
  'attack-the-premise': 'Attack the Premise',
  'subtract-before-you-add': 'Subtract Before You Add',
  'minimize-reader-load': 'Minimize Reader Load',
  'outcome-oriented-execution': 'Outcome-Oriented Execution',
  'experience-first': 'Experience First',
  'exhaust-the-design-space': 'Exhaust the Design Space',
  'build-the-lever': 'Build the Lever',
  'model-the-domain': 'Model the Domain',
  'boundary-discipline': 'Boundary Discipline',
  'type-system-discipline': 'Type System Discipline',
  'make-operations-idempotent': 'Make Operations Idempotent',
  'migrate-callers-then-delete-legacy-apis': 'Migrate Callers Then Delete Legacy APIs',
  'separate-before-serializing-shared-state': 'Separate Before Serializing Shared State',
  'prove-it-works': 'Prove It Works',
  'fix-root-causes': 'Fix Root Causes',
  'sequence-verifiable-units': 'Sequence Verifiable Units',
  'test-behavior-not-implementation': 'Test Behavior Not Implementation',
  'explain-the-number': 'Explain the Number',
  'guard-the-context-window': 'Guard the Context Window',
  'never-block-on-the-human': 'Never Block on the Human',
  'encode-lessons-in-structure': 'Encode Lessons in Structure',
};

export const ARTIFACTS = [
  'concepts_brief.md',
  'design_draft.md',
  'domain_model.md',
  'review/01-zoom-out.md',
  'review/05-readiness.md',
  'goldfish_review_report.md',
  'consolidated_review_report.md',
  'drift_report.md',
  'ddd_review.md',
  'ste100_report.md',
  'arena/',
  'statechart/',
  'team/',
];
