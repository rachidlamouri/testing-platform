import { useState, useEffect } from 'react';
import {
  MetadataById,
  SvgWrapperComponentMetadataList,
} from './dynamicComponentTypes';

const generatedDataPromise = import('./generated') as Promise<{
  default: SvgWrapperComponentMetadataList;
}>;

const generatedMetadataByIdPromise = import(
  './generated/metadataById'
) as Promise<{
  default: MetadataById;
}>;

type GeneratedMetadata = {
  componentMetadataList: SvgWrapperComponentMetadataList | null;
  metadataById: MetadataById;
};

export const useGeneratedMetadata = (): GeneratedMetadata => {
  const [componentMetadataList, setComponentMetadataList] =
    useState<SvgWrapperComponentMetadataList | null>(null);
  const [metadataById, setMetadataById] = useState<MetadataById>({});

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedDataPromise.then(({ default: value }) => {
      setComponentMetadataList(value);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedMetadataByIdPromise.then((module) => {
      setMetadataById(module.default);
    });
  });

  return {
    componentMetadataList,
    metadataById,
  };
};
