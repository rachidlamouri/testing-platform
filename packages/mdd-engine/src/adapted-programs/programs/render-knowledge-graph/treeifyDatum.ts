import { builders as b, namedTypes as n } from 'ast-types';
import {
  getCustomTypedDatum,
  CustomDatumTypeName,
} from '../../../package-agnostic-utilities/typed-datum/customTypedDatum';

type TreeifiedDatumNode =
  | n.Identifier
  | n.Literal
  | n.ArrayExpression
  | n.ObjectExpression
  | n.NewExpression
  | n.MemberExpression;

export class IdentifierConfiguration {
  constructor(public readonly name: string) {}
}

export class EnumReferenceConfiguration {
  constructor(
    public readonly enumName: string,
    public readonly keyName: string,
  ) {}
}

/**
 * Converts any data into an abstract syntax tree. Useful for dynamically
 * generating data given a typed data structure.
 */
export const treeifyDatum = (datum: unknown): TreeifiedDatumNode => {
  const typedDatum = getCustomTypedDatum(datum);

  switch (typedDatum.typeName) {
    case CustomDatumTypeName.RootObjectInstance:
    case CustomDatumTypeName.CustomObjectInstance: {
      if (typedDatum.datum instanceof IdentifierConfiguration) {
        const result = b.identifier(typedDatum.datum.name);
        return result;
      }

      if (typedDatum.datum instanceof EnumReferenceConfiguration) {
        const result = b.memberExpression(
          b.identifier(typedDatum.datum.enumName),
          b.identifier(typedDatum.datum.keyName),
        );
        return result;
      }

      const propertyList = Object.entries(typedDatum.datum).map(
        ([key, value]) => {
          return b.objectProperty(b.identifier(key), treeifyDatum(value));
        },
      );

      const result = b.objectExpression(propertyList);
      return result;
    }
    case CustomDatumTypeName.Array: {
      const elementList = typedDatum.datum.map((value) => treeifyDatum(value));
      const result = b.arrayExpression(elementList);
      return result;
    }
    case CustomDatumTypeName.Map: {
      const entryList = [...typedDatum.datum.entries()].map(([key, value]) => {
        const entry = b.arrayExpression([
          treeifyDatum(key),
          treeifyDatum(value),
        ]);

        return entry;
      });

      const parameter = b.arrayExpression(entryList);
      const result = b.newExpression(b.identifier('Map'), [parameter]);
      return result;
    }
    case CustomDatumTypeName.Set: {
      const valueList = [...typedDatum.datum.values()].map((value) => {
        return treeifyDatum(value);
      });

      const parameter = b.arrayExpression(valueList);
      const result = b.newExpression(b.identifier('Set'), [parameter]);
      return result;
    }
    case CustomDatumTypeName.BigInteger:
    case CustomDatumTypeName.Boolean:
    case CustomDatumTypeName.Null:
    case CustomDatumTypeName.Number:
    case CustomDatumTypeName.String:
      return b.literal(typedDatum.datum);
    case CustomDatumTypeName.Undefined:
      return b.identifier('undefined');
    case CustomDatumTypeName.Function:
    case CustomDatumTypeName.Symbol: {
      throw new Error(`Unsupported datum type "${typedDatum.typeName}"`);
    }
  }
};
