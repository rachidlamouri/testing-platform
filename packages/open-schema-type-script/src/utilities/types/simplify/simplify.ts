import { UnknownObject } from '../unknownHelpers';
import { SimplifyObject } from './simplifyObject';

export type Simplify<T> = T extends UnknownObject ? SimplifyObject<T> : T;
