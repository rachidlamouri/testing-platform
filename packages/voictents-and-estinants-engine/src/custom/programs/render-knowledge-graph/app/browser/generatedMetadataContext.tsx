import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  FunctionComponent,
  useContext,
} from 'react';
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

export const GeneratedMetadataContext = createContext<GeneratedMetadata>({
  componentMetadataList: null,
  metadataById: null,
});

export const GeneratedMetadataProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
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

  return (
    <GeneratedMetadataContext.Provider
      value={{
        componentMetadataList,
        metadataById,
      }}
    >
      {children}
    </GeneratedMetadataContext.Provider>
  );
};

export const useGeneratedMetadata = (): GeneratedMetadata => {
  return useContext(GeneratedMetadataContext);
};
