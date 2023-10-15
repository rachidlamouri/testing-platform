
import { buildEstinant } from '../../../packages/mdd-engine/src/adapter/estinant-builder/estinantBuilder'

const UPDATE_ME_INPUT_GEPP: any = 'UPDATE_ME';
type UpdateMeInputVoque = any;

const UPDATE_ME_OUTPUT_GEPP: any = 'UPDATE_ME_TOO';
type UpdateMeOutputVoque = any;

export const estinantSnapshot = buildEstinant({
  name: 'estinantSnapshot',
})
  .fromHubblepup2<UpdateMeInputVoque>({
    gepp: UPDATE_ME_INPUT_GEPP
  })
  .toHubblepup2<UpdateMeOutputVoque>({
    gepp: UPDATE_ME_OUTPUT_GEPP
  })
  .onPinbe((RENAME_ME) => {
    // TODO: implement me
  })
  .assemble();

