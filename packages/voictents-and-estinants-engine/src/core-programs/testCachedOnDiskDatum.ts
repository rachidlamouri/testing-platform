import fs from 'fs';
import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryVoictent } from '../layer-agnostic-utilities/voictent/inMemoryVoictent';
import {
  CacheableAccessor,
  CachedOnDiskVoictent,
  CachedOnDiskVoque,
} from '../layer-agnostic-utilities/voictent/cachedOnDiskVoictent';
import { OutputVicken } from '../core/types/vicken/outputVicken';
import { Estinant2 } from '../core/types/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/types/vicken/leftInputVicken';
import { StandardInMemoryVoque } from '../layer-agnostic-utilities/voque/inMemoryVoque';

type InputVoque = StandardInMemoryVoque<'input', CacheableAccessor<string>>;

type CachedVoque = CachedOnDiskVoque<'cached', string>;

const nameSpace = 'test-cached-on-disk-datum';

const filePath =
  'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';

/**
 * Forwards each item in the input collection to the cached collection. We need
 * this transform, since a cached collection does not take an in-memory initial
 * collection.
 *
 * @todo Decide if a cached collection should be able to take an initial input
 * tuple through code, and not just through the file system. Either way update
 * the above description accordingly
 */
const writeDatumToCache: Estinant2<
  LeftInputHubblepupVicken<InputVoque>,
  [],
  OutputVicken<[CachedVoque]>
> = {
  version: 2,
  name: 'writeDatumToCache',
  leftInputAppreffinge: {
    gepp: 'input',
    isWibiz: false,
  },
  outputAppreffinge: {
    geppTuple: ['cached'],
  },
  rightInputAppreffingeTuple: [],
  tropoig: (rawInput): OutputVicken<[CachedVoque]>['tropoignantOutput'] => {
    return {
      cached: [rawInput.hubblepup],
    };
  },
};

/**
 * An example program to demonstrate "CachedOnDiskVoictent"
 */
digikikify2({
  inputVoictentList: [
    new InMemoryVoictent<InputVoque>({
      gepp: 'input',
      initialHubblepupPelueTuple: [
        {
          zorn: filePath.replaceAll('/', ' | '),
          lastModified: fs.statSync(filePath).mtime.toISOString(),
          grition: (): CachedVoque['hubblepupPelie']['grition'] => {
            const text = fs.readFileSync(filePath, 'utf8');
            return text;
          },
        },
      ],
    }),
    new CachedOnDiskVoictent<CachedVoque>({
      nameSpace,
      gepp: 'cached',
    }),
  ],
  estinantTuple: [writeDatumToCache],
});
