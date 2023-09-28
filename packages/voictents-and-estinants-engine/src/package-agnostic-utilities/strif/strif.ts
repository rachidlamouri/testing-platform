import * as uuidUtils from 'uuid';
import { localIdCharacterEncodingList } from './localIdCharacterEncodingList';

/**
 * { globalId: 'fea3f4c4-7d1e-41f4-bfac-bb9d7d719107', localId: 'KK5R' }
 */
export type Strif = {
  globalId: string;
  localId: string;
};

const UUID_HEX_LENGTH = 32;

const LOCAL_ID_LENGTH = 4;

const uuidChunkSize = Math.ceil(UUID_HEX_LENGTH / LOCAL_ID_LENGTH);

const uuidToLocalId = (uuid: string): string => {
  if (!uuidUtils.validate(uuid)) {
    throw Error(`Value is not a uuid: ${uuid}`);
  }

  const uuidWithoutHyphens = uuid.replaceAll('-', '');
  const uuidCharacterList = uuidWithoutHyphens.split('');

  const chunkCount = Math.ceil(UUID_HEX_LENGTH / uuidChunkSize);
  const chunkList: string[] = Array.from({ length: chunkCount }).map(
    (unused, chunkIndex) => {
      const startIndex = chunkIndex * uuidChunkSize;
      const endIndex = startIndex + uuidChunkSize;

      const characterList = uuidCharacterList.slice(startIndex, endIndex);
      const chunk = characterList.join('');

      return chunk;
    },
  );

  const numericalValueList = chunkList.map((hexadecimalText) => {
    return parseInt(hexadecimalText, 16);
  });

  const codePointIndexList = numericalValueList.map(
    (numericalValue) => numericalValue % localIdCharacterEncodingList.length,
  );
  const characterList = codePointIndexList.map(
    (codePointIndex) => localIdCharacterEncodingList[codePointIndex],
  );

  const localId = characterList.join('');

  return localId;
};

export const createStrif = (): Strif => {
  const globalId = uuidUtils.v4();
  const localId = uuidToLocalId(globalId);

  return {
    globalId,
    localId,
  };
};
