import fs from 'fs';
import { runEngine2 } from '../core/engine/runEngine';
import { InMemoryCollection } from '../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  CacheableAccessor,
  CachedOnDiskCollection,
  CachedOnDiskStreamMetatype,
} from '../layer-agnostic-utilities/collection/cachedOnDiskCollection';
import { OutputStreamConnectionMetatype } from '../core/types/stream-connection-metatype/outputStreamConnectionMetatype';
import { ProgrammedTransform2 } from '../core/types/programmed-transform/programmedTransform';
import { LeftInputItemStreamConnectionMetatype } from '../core/types/stream-connection-metatype/leftInputStreamConnectionMetatype';
import { StandardInMemoryStreamMetatype } from '../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

type InputStreamMetatype = StandardInMemoryStreamMetatype<
  'input',
  CacheableAccessor<string>
>;

type CachedStreamMetatype = CachedOnDiskStreamMetatype<'cached', string>;

const nameSpace = 'test-cached-on-disk-datum';

const filePath = 'packages/mdd-engine/src/core/engine/runEngine.ts';

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
  LeftInputItemStreamConnectionMetatype<InputStreamMetatype>,
  [],
  OutputStreamConnectionMetatype<[CachedStreamMetatype]>
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
  ): OutputStreamConnectionMetatype<
    [CachedStreamMetatype]
  >['coreTransformOutput'] => {
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
runEngine2({
  inputCollectionList: [
    new InMemoryCollection<InputStreamMetatype>({
      collectionId: 'input',
      initialItemEggTuple: [
        {
          id: filePath.replaceAll('/', ' | '),
          lastModified: fs.statSync(filePath).mtime.toISOString(),
          subitem: (): CachedStreamMetatype['itemStreamable']['subitem'] => {
            const text = fs.readFileSync(filePath, 'utf8');
            return text;
          },
        },
      ],
    }),
    new CachedOnDiskCollection<CachedStreamMetatype>({
      nameSpace,
      collectionId: 'cached',
    }),
  ],
  programmedTransformTuple: [writeDatumToCache],
});
