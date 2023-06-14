import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { EngineEstinant2 } from '../../programmable-units/engine-program/engineEstinant2';
import { EngineProgram2 } from '../../programmable-units/engine-program/engineProgram2';
import { EngineVoque } from '../../programmable-units/engine-program/engineVoque';

export type GraphSourceElement = EngineProgram2 | EngineVoque | EngineEstinant2;

export type GraphSourceElementById = Map<string, GraphSourceElement>;

export const GRAPH_SOURCE_ELEMENT_BY_ID_GEPP = 'graph-source-element-by-id';

export type GraphSourceElementByIdGepp = typeof GRAPH_SOURCE_ELEMENT_BY_ID_GEPP;

export const GRAPH_SOURCE_ELEMENT_BY_ID_SINGLETON_ID =
  '983b126b-15cd-4331-b189-3ab9a791d561';

export type GraphSourceElementByIdVoque = StandardInMemoryVoque<
  GraphSourceElementByIdGepp,
  GraphSourceElementById
>;
