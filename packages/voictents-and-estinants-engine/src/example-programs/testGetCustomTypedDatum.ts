import { Estinant } from '../core/engine-shell/estinant/estinant';
import { QuirmList } from '../core/engine-shell/quirm/quirm';
import { digikikify } from '../core/engine/digikikify';
import { InMemoryOdeshinVoictent } from '../core/engine/inMemoryOdeshinVoictent';
import { InMemoryVoictentConfiguration } from '../core/engine/inMemoryVoictent';
import {
  DATUM_TEST_CASE_INPUT_GEPP,
  DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
  DatumTestCaseInputOdeshin,
} from '../custom/programmable-units/datum-test-case-input/datumTestCaseInput';
import { getCustomTypedDatum } from '../utilities/typed-datum/customTypedDatum';
import { buildAddMetadataForSerialization } from './buildAddMetadataForSerialization';
import {
  JsonSerializableVoictent,
  JsonSerializableVoictentConfiguration,
} from './jsonSerializableVoictent';

type SerializedConfiguration =
  JsonSerializableVoictentConfiguration<'serialized'>;
type TypedDatumVoictentConfiguration = InMemoryVoictentConfiguration<
  'typed-datum',
  unknown
>;

digikikify({
  inputVoictentList: [
    new InMemoryOdeshinVoictent({
      gepp: DATUM_TEST_CASE_INPUT_GEPP,
      initialHubblepupTuple: DATUM_TEST_CASE_INPUT_ODESHIN_LIST,
    }),
    new InMemoryOdeshinVoictent({
      gepp: 'typed-datum',
      initialHubblepupTuple: [],
    }),
    new JsonSerializableVoictent<SerializedConfiguration>({
      nameSpace: 'test-get-custom-typed-datum',
      gepp: 'serialized',
      initialHubblepupTuple: [],
    }),
  ],
  initialQuirmTuple: [],
  estinantTuple: [
    {
      name: 'getCustomTypedTestCaseInputTypeName',
      leftAppreffinge: {
        gepp: DATUM_TEST_CASE_INPUT_GEPP,
      },
      rightAppreffingeTuple: [],
      tropoig: (input): QuirmList => {
        const inputOdeshin = input.hubblepup as DatumTestCaseInputOdeshin;
        const testCaseInput = inputOdeshin.grition;

        const typedDatum = getCustomTypedDatum(testCaseInput);

        return [
          {
            gepp: 'typed-datum',
            hubblepup: {
              zorn: inputOdeshin.zorn,
              grition: {
                typeName: typedDatum.typeName,
              },
            },
          },
        ];
      },
      // TODO: improve the typing of the core estinant
    } satisfies Estinant,

    buildAddMetadataForSerialization<
      TypedDatumVoictentConfiguration,
      SerializedConfiguration
    >({
      inputGepp: 'typed-datum',
      outputGepp: 'serialized',
    }),
  ],
  onHubblepupAddedToVoictents: () => {},
});
