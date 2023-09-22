import { namedTypes as n, builders as b } from 'ast-types';
import * as recast from 'recast';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  CustomDatumTypeName,
  getCustomTypedDatum,
} from '../../../utilities/typed-datum/customTypedDatum';
import {
  TypeScriptArray,
  TypeScriptObjectInstance,
} from '../../../utilities/typed-datum/type-script/object';
import {
  OUTPUT_FILE_GEPP,
  OutputFile,
  OutputFileVoque,
} from '../../programmable-units/output-file/outputFile';
import { Metadata } from './app/browser/dynamicComponentTypes';
import {
  APP_RENDERER_DELAYER_GEPP,
  AppRendererDelayerInstance,
  AppRendererDelayerVoque,
} from './appRendererDelayer';
import { FILE_FACT_2_GEPP, FileFact2Voque } from './file/fileFact2';

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
export const constructDynamicMetadataFile = buildEstinant({
  name: 'constructDynamicMetadataFile',
})
  .fromVoictent2<FileFact2Voque>({
    gepp: FILE_FACT_2_GEPP,
  })
  .toHubblepup2<OutputFileVoque>({
    gepp: OUTPUT_FILE_GEPP,
  })
  .toHubblepup2<AppRendererDelayerVoque>({
    gepp: APP_RENDERER_DELAYER_GEPP,
  })
  .onPinbe((fileFactVoictent) => {
    const metadataList: Metadata[] = fileFactVoictent.map(
      (fileFact) => fileFact.graphMetadata,
    );

    const metadataById = Object.fromEntries(
      metadataList.map((metadata) => {
        return [metadata.id, metadata];
      }),
    );

    const astNode = encodeDatum(metadataById);

    const metadataByIdCode = recast.print(astNode).code;

    const filePath = `packages/voictents-and-estinants-engine/src/adapted-programs/programs/render-knowledge-graph/app/browser/generated/metadataById.tsx`;
    const moduleCode = [
      'import { MetadataById } from "../dynamicComponentTypes"',
      `export default ${metadataByIdCode}`,
    ].join('\n');

    const outputFile: OutputFile = {
      filePath,
      text: moduleCode,
    };

    return {
      [OUTPUT_FILE_GEPP]: outputFile,
      [APP_RENDERER_DELAYER_GEPP]: new AppRendererDelayerInstance({
        estinantName: 'constructDynamicMetadataFile',
      }),
    };
  })
  .assemble();
