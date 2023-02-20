import { SimplifyObject } from './simplifyObject';

export type Simplify<T> = T extends object ? SimplifyObject<T> : T;
