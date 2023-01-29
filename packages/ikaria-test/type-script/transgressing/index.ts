export const orchestrator = Promise;
export const ikariaOrchestrator = orchestrator;
export const reporter = console;
export { assertUtil as signaler } from '../agnostic/assertUtil';

// TODO: figure out what to do so we don't have to make an extraneous export
export type Transgressing = symbol;
