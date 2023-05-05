import fs from 'fs';
import { digikikify } from '../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoque,
} from '../core/engine/inMemoryVoictent';
import {
  CacheableAccessor,
  CachedOnDiskVoictent,
  CachedOnDiskVoque,
} from '../core/engine/cachedOnDiskVoictent';
import { QuirmList } from '../core/engine-shell/quirm/quirm';

type InputVoque = InMemoryVoque<'input', CacheableAccessor<string>>;

type CachedVoque = CachedOnDiskVoque<'cached', string>;

const nameSpace = 'test-cached-on-disk-datum';

const filePath =
  'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';

digikikify({
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
  estinantTuple: [
    {
      leftAppreffinge: {
        gepp: 'input',
      },
      rightAppreffingeTuple: [],
      tropoig: (rawInput): QuirmList => {
        return [
          {
            gepp: 'cached',
            hubblepup: rawInput.hubblepup,
          },
        ];
      },
    },
  ],
  onHubblepupAddedToVoictents: () => {},
});
