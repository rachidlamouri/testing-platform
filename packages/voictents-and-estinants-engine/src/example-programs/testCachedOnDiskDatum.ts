import fs from 'fs';
import { digikikify2 } from '../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoque,
} from '../core/engine/inMemoryVoictent';
import {
  CacheableAccessor,
  CachedOnDiskVoictent,
  CachedOnDiskVoque,
} from '../core/engine/cachedOnDiskVoictent';
import { OutputVicken } from '../core/engine-shell/vicken/outputVicken';
import { Estinant2 } from '../core/engine-shell/estinant/estinant';
import { LeftInputHubblepupVicken } from '../core/engine-shell/vicken/leftInputVicken';

type InputVoque = InMemoryVoque<'input', CacheableAccessor<string>>;

type CachedVoque = CachedOnDiskVoque<'cached', string>;

const nameSpace = 'test-cached-on-disk-datum';

const filePath =
  'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';

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
      initialHubblepupTuple: [
        {
          zorn: filePath.replaceAll('/', ' | '),
          lastModified: fs.statSync(filePath).mtime.toISOString(),
          grition: (): CachedVoque['emittedHubblepup']['grition'] => {
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
