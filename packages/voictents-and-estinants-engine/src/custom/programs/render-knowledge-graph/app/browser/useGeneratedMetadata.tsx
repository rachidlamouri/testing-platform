import { useState, useEffect } from 'react';
import { SvgWrapperComponentMetadataList } from './dynamicComponentTypes';

const generatedDataPromise = import('./generated') as Promise<{
  default: SvgWrapperComponentMetadataList;
}>;

type GeneratedMetadata = {
  componentMetadataList: SvgWrapperComponentMetadataList | null;
};

export const useGeneratedMetadata = (): GeneratedMetadata => {
  const [componentMetadataList, setComponentMetadataList] =
    useState<SvgWrapperComponentMetadataList | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedDataPromise.then(({ default: value }) => {
      setComponentMetadataList(value);
    });
  });

  return {
    componentMetadataList,
  };
};
