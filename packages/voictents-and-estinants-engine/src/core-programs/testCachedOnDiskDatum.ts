import fs from 'fs';
import { digikikify2 } from '../core/engine/digikikify';
import { InMemoryCollection } from '../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  CacheableAccessor,
  CachedOnDiskCollection,
  CachedOnDiskStreamMetatype,
} from '../layer-agnostic-utilities/collection/cachedOnDiskCollection';
import { OutputStreamConnectionMetatype } from '../core/types/vicken/outputVicken';
import { ProgrammedTransform2 } from '../core/types/estinant/estinant';
import { LeftInputItemStreamConnectionMetatype } from '../core/types/vicken/leftInputVicken';
import { StandardInMemoryStreamMetatype } from '../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

type InputVoque = StandardInMemoryStreamMetatype<
  'input',
  CacheableAccessor<string>
>;

type CachedVoque = CachedOnDiskStreamMetatype<'cached', string>;

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
const writeDatumToCache: ProgrammedTransform2<
  LeftInputItemStreamConnectionMetatype<InputVoque>,
  [],
  OutputStreamConnectionMetatype<[CachedVoque]>
> = {
  version: 2,
  name: 'writeDatumToCache',
  leftInputStreamConfiguration: {
    collectionId: 'input',
    isCollectionStream: false,
  },
  outputStreamConfiguration: {
    collectionIdTuple: ['cached'],
  },
  rightInputStreamConfigurationTuple: [],
  transform: (
    rawInput,
  ): OutputStreamConnectionMetatype<[CachedVoque]>['tropoignantOutput'] => {
    return {
      cached: [rawInput.item],
    };
  },
};

/**
 * An example program to demonstrate "CachedOnDiskVoictent"
 *
 * @canonicalComment
 */
digikikify2({
  inputVoictentList: [
    new InMemoryCollection<InputVoque>({
      collectionId: 'input',
      initialItemEggTuple: [
        {
          id: filePath.replaceAll('/', ' | '),
          lastModified: fs.statSync(filePath).mtime.toISOString(),
          subitem: (): CachedVoque['hubblepupPelie']['subitem'] => {
            const text = fs.readFileSync(filePath, 'utf8');
            return text;
          },
        },
      ],
    }),
    new CachedOnDiskCollection<CachedVoque>({
      nameSpace,
      collectionId: 'cached',
    }),
  ],
  estinantTuple: [writeDatumToCache],
});
