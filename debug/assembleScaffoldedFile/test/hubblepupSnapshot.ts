
import { InMemoryOdeshin2ListVoque } from '../../../packages/mdd-engine/src/core/engine/inMemoryOdeshinVoictent2'
import { buildNamedConstructorFunction } from '../../../packages/mdd-engine/src/package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder'
import { GenericZorn2Template, Zorn2 } from '../../../packages/mdd-engine/src/package-agnostic-utilities/datastructure/zorn'
import { SimplifyN } from '../../../packages/mdd-engine/src/package-agnostic-utilities/type/simplify'

const HUBBLEPUP_SNAPSHOT_ZORN_TEMPLATE = [
  'UPDATE_ME'
] as const satisfies GenericZorn2Template
type HubblepupSnapshotZornTemplate = typeof HUBBLEPUP_SNAPSHOT_ZORN_TEMPLATE
class HubblepupSnapshotZorn extends Zorn2<HubblepupSnapshotZornTemplate> {
  get rawTemplate(): HubblepupSnapshotZornTemplate {
    return HUBBLEPUP_SNAPSHOT_ZORN_TEMPLATE
  }
}

type HubblepupSnapshotConstructorInput = {
  UPDATE_ME: any;
}

type HubblepupSnapshot = SimplifyN<[
  { zorn: HubblepupSnapshotZorn },
  HubblepupSnapshotConstructorInput,
  {
    // TODO: UPDATE_ME
  }
]>

export const { HubblepupSnapshotInstance } = buildNamedConstructorFunction({
  constructorName: 'HubblepupSnapshotInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
  ] as const satisfies readonly (keyof HubblepupSnapshot)[],
})
  .withTypes<HubblepupSnapshotConstructorInput, HubblepupSnapshot>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { UPDATE_ME } = input;

      const zorn = new HubblepupSnapshotZorn({
        UPDATE_ME: UPDATE_ME,
      });

      return {
        zorn,
        ...input,
      } satisfies HubblepupSnapshot
    },
  })
  .assemble()

  export const HUBBLEPUP_SNAPSHOT_GEPP = 'hubblepup-snapshot'

  type HubblepupSnapshotGepp = typeof HUBBLEPUP_SNAPSHOT_GEPP

  export type HubblepupSnapshotVoque = InMemoryOdeshin2ListVoque<HubblepupSnapshotGepp, HubblepupSnapshot>

