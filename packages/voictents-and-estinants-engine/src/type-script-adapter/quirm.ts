import { Quirm as CoreQuirm } from '../core/engine-shell/quirm/quirm';

export type Quirm<TQuirm extends CoreQuirm = CoreQuirm> = TQuirm;

export type QuirmArray = Quirm[];

export type QuirmTuple = readonly Quirm[];

export type QuirmList = QuirmArray | QuirmTuple;
