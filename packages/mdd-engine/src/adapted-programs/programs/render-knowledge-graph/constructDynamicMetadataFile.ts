import { namedTypes as n, builders as b } from 'ast-types';
import * as recast from 'recast';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';
import {
  TypeScriptArray,
  TypeScriptObjectInstance,
} from '../../../package-agnostic-utilities/object/typeScriptObject';
import {
  OUTPUT_FILE_COLLECTION_ID,
  OutputFile,
  OutputFileStreamMetatype,
} from '../../programmable-units/output-file/outputFile';
import { Metadata } from './app/browser/dynamicComponentTypes';
import {
  APP_RENDERER_DELAYER_COLLECTION_ID,
  AppRendererDelayerInstance,
  AppRendererDelayerStreamMetatype,
} from './appRendererDelayer';
import {
  FILE_FACT_2_COLLECTION_ID,
  FileFact2StreamMetatype,
} from './file/fileFact2';
import {
  BOUNDARY_FACT_COLLECTION_ID,
  BoundaryFactStreamMetatype,
} from './boundary/boundaryFact';
import {
  COMMON_BOUNDARY_ROOT_COLLECTION_ID,
  CommonBoundaryRootStreamMetatype,
} from './common-boundary-root/commonBoundaryRoot';

const encodePrimitive = (
  primitive: string | number | boolean | null,
): n.Literal => {
  const node = b.literal(primitive);
  return node;
};

const encodeArray = (array: TypeScriptArray): n.ArrayExpression => {
  const node = b.arrayExpression(
    array.map((value) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return encodeDatum(value);
    }),
  );
  return node;
};

const encodeObject = (object: TypeScriptObjectInstance): n.ObjectExpression => {
  const entryList = Object.entries(object);

  const node = b.objectExpression(
    entryList.map(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const property = b.property('init', b.literal(key), encodeDatum(value));
      return property;
    }),
  );
  return node;
};

const encodeDatum = (
  datum: unknown,
): n.Literal | n.ArrayExpression | n.ObjectExpression => {
  const typedDatum = getCustomTypedDatum(datum);

  switch (typedDatum.typeName) {
    case CustomDatumTypeName.Boolean:
    case CustomDatumTypeName.Null:
    case CustomDatumTypeName.Number:
    case CustomDatumTypeName.String:
      return encodePrimitive(typedDatum.datum);
    case CustomDatumTypeName.Array:
      return encodeArray(typedDatum.datum);
    case CustomDatumTypeName.RootObjectInstance:
      return encodeObject(typedDatum.datum);
    case CustomDatumTypeName.Map:
    case CustomDatumTypeName.Function:
    case CustomDatumTypeName.CustomObjectInstance:
    case CustomDatumTypeName.Set:
    case CustomDatumTypeName.Symbol:
    case CustomDatumTypeName.Undefined:
    case CustomDatumTypeName.BigInteger: {
      throw new Error(`${typedDatum.typeName} is not supported`);
    }
  }
};

/**
 * Accumulates all fact metadata into an object keyed by fact id for the
 * knowledge graph to consume and present the data
 */
export const constructDynamicMetadataFile = buildProgrammedTransform({
  name: 'constructDynamicMetadataFile',
})
  .fromCollection2<BoundaryFactStreamMetatype>({
    collectionId: BOUNDARY_FACT_COLLECTION_ID,
  })
  .andFromItemTuple2<CommonBoundaryRootStreamMetatype, ['']>({
    collectionId: COMMON_BOUNDARY_ROOT_COLLECTION_ID,
    // TODO: make a more readable pattern for singleton collections
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .andFromCollection2<FileFact2StreamMetatype>({
    collectionId: FILE_FACT_2_COLLECTION_ID,
  })
  .toItem2<OutputFileStreamMetatype>({
    collectionId: OUTPUT_FILE_COLLECTION_ID,
  })
  .toItem2<AppRendererDelayerStreamMetatype>({
    collectionId: APP_RENDERER_DELAYER_COLLECTION_ID,
  })
  .onTransform(
    (boundaryFactCollection, [commonBoundaryRoot], fileFactCollection) => {
      const metadataList: Metadata[] = [
        ...boundaryFactCollection.list,
        ...fileFactCollection.list,
      ].map((fact) => fact.graphMetadata);

      const metadataById = Object.fromEntries(
        metadataList.map((metadata) => {
          return [metadata.id, metadata];
        }),
      );

      // TODO: indexing this with a hardcoded key is a terrible idea. Store this object elsewhere
      metadataById['common-boundary-root'] = {
        title: 'Common Boundary Root',
        id: 'common-boundary-root',
        fileSystemPath: commonBoundaryRoot.directoryPath,
        fieldList: [
          {
            label: 'Directory Path',
            value: `~r/${commonBoundaryRoot.directoryPath}`,
          },
        ],
      };

      const astNode = encodeDatum(metadataById);

      const metadataByIdCode = recast.print(astNode).code;

      const filePath = `packages/mdd-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/generated/metadataById.tsx`;
      const moduleCode = [
        'import { MetadataById } from "../dynamicComponentTypes"',
        `export default ${metadataByIdCode}`,
      ].join('\n');

      const outputFile: OutputFile = {
        filePath,
        text: moduleCode,
      };

      return {
        [OUTPUT_FILE_COLLECTION_ID]: outputFile,
        [APP_RENDERER_DELAYER_COLLECTION_ID]: new AppRendererDelayerInstance({
          programmedTransformName: 'constructDynamicMetadataFile',
        }),
      };
    },
  )
  .assemble();
