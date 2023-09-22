import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  FunctionComponent,
  useContext,
} from 'react';
import { MetadataById, GeneratedIndex } from './dynamicComponentTypes';

const generatedDataPromise = import('./generated') as Promise<{
  default: GeneratedIndex;
}>;

const generatedMetadataByIdPromise = import(
  './generated/metadataById'
) as Promise<{
  default: MetadataById;
}>;

type GeneratedMetadata = {
  generatedIndex: GeneratedIndex | null;
  metadataById: MetadataById;
};

export const GeneratedMetadataContext = createContext<GeneratedMetadata>({
  generatedIndex: null,
  metadataById: null,
});

export const GeneratedMetadataProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  const [generatedIndex, setLayerList] = useState<GeneratedIndex | null>(null);
  const [metadataById, setMetadataById] = useState<MetadataById>({});

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedDataPromise.then(({ default: value }) => {
      setLayerList(value);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generatedMetadataByIdPromise.then((module) => {
      setMetadataById(module.default);
    });
  });

  return (
    <GeneratedMetadataContext.Provider
      value={{
        generatedIndex,
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
