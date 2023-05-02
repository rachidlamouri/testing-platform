import fs from 'fs';
import { digikikify } from '../core/engine/digikikify';
import {
  InMemoryVoictent,
  InMemoryVoictentConfiguration,
} from '../core/engine/inMemoryVoictent';
import {
  CacheableAccessor,
  CachedOnDiskVoictent,
  CachedOnDiskVoictentConfiguration,
} from '../core/engine/cachedOnDiskVoictent';
import { QuirmList } from '../core/engine-shell/quirm/quirm';

type InputVoictentConfiguration = InMemoryVoictentConfiguration<
  'input',
  CacheableAccessor<string>
>;

type CachedVoictentConfiguration = CachedOnDiskVoictentConfiguration<
  'cached',
  string
>;

const nameSpace = 'test-cached-on-disk-datum';

const filePath =
  'packages/voictents-and-estinants-engine/src/core/engine/digikikify.ts';

digikikify({
  inputVoictentList: [
    new InMemoryVoictent<InputVoictentConfiguration>({
      gepp: 'input',
      initialHubblepupTuple: [
        {
          zorn: filePath.replaceAll('/', ' | '),
          lastModified: fs.statSync(filePath).mtime.toISOString(),
          grition:
            (): CachedVoictentConfiguration['emittedHubblepup']['grition'] => {
              const text = fs.readFileSync(filePath, 'utf8');
              return text;
            },
        },
      ],
    }),
    new CachedOnDiskVoictent<CachedVoictentConfiguration>({
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
