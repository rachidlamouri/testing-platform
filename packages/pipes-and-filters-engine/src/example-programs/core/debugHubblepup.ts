import * as uuid from 'uuid';
import { Hubblepup } from '../../core/hubblepup';
import { Quirm } from '../../core/quirm';
import { fileUtilities } from '../../utilities/debugger/fileUtilities';

type IdentifiableHubblepup = {
  identifier: string;
  hubblepup: Hubblepup;
};

const hubblepupCache = new Map<Hubblepup, IdentifiableHubblepup>();

const getOrInstantiateAndCacheIdentifiableHubblepup = (
  quirm: Quirm,
): IdentifiableHubblepup => {
  const identifiableHubblepup = hubblepupCache.get(quirm.hubblepup) ?? {
    identifier: uuid.v4(),
    hubblepup: quirm.hubblepup,
  };

  hubblepupCache.set(quirm.hubblepup, identifiableHubblepup);

  return identifiableHubblepup;
};

export const debugHubblepup = (quirm: Quirm): void => {
  const { hubblepup, identifier } =
    getOrInstantiateAndCacheIdentifiableHubblepup(quirm);

  fileUtilities.writeCacheFile({
    directoryName: quirm.gepp,
    fileName: identifier,
    data: hubblepup,
  });
};
