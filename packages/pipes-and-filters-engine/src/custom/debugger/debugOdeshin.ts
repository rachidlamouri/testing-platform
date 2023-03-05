import { fileUtilities } from '../../utilities/debugger/fileUtilities';
import { Odeshin } from '../adapter/odeshin';
import { Plifal } from '../adapter/plifal';

type IdentifiableHubblepup = {
  identifier: string;
  odeshin: Odeshin;
};

const odeshinCache = new Map<Odeshin, IdentifiableHubblepup>();

const escapePathSeparator = (text: string): string =>
  text.replaceAll(/\//g, '|');

const getOrInstantiateAndCacheIdentifiableHubblepup = (
  plifal: Plifal,
): IdentifiableHubblepup => {
  const identifiableOdeshin = odeshinCache.get(plifal.hubblepup) ?? {
    identifier: plifal.hubblepup.identifier,
    odeshin: plifal.hubblepup,
  };

  odeshinCache.set(plifal.hubblepup, identifiableOdeshin);

  return identifiableOdeshin;
};

export const debugOdeshin = (plifal: Plifal): void => {
  const { odeshin, identifier } =
    getOrInstantiateAndCacheIdentifiableHubblepup(plifal);

  fileUtilities.writeCacheFile({
    directoryName: plifal.gepp,
    fileName: escapePathSeparator(identifier),
    data: odeshin,
  });
};
