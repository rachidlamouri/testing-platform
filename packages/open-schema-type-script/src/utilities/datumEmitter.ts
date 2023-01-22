import EventEmitter from 'events';
import { UnknownDatumInstance } from '../core/datumInstance';

const DATUM_EVENT_NAME = 'datum' as const;

export type DatumHandler<TDatum = UnknownDatumInstance> = (
  datum: TDatum,
) => void;

// TODO: learn how to use node Streams and re-implement this as a stream
export class DatumEmitter<TDatum = UnknownDatumInstance> extends EventEmitter {
  constructor(onDatum: DatumHandler<TDatum>) {
    super();

    this.on(DATUM_EVENT_NAME, onDatum);
  }

  emitDatum(datum: TDatum): void {
    this.emit(DATUM_EVENT_NAME, datum);
  }
}
