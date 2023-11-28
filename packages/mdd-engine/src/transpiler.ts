import * as recast from 'recast';
import { namedTypes as n, builders as b } from 'ast-types';
import { TranspilerFactory, Transpiler } from 'ts-node';
import { transpile } from 'typescript';

const instrument = (code: string): string => {
  const tree = recast.parse(code) as n.File;

  let instrumentCount = 0;

  recast.visit(tree, {
    visitBlockStatement(path) {
      // eslint-disable-next-line no-param-reassign
      path.node.body = [
        b.expressionStatement(
          b.callExpression(b.identifier('__INSTRUMENT__'), [
            b.literal(instrumentCount),
          ]),
        ),
        ...path.node.body,
      ];

      instrumentCount += 1;
      this.traverse(path);
    },
  });

  tree.program.body = [
    b.variableDeclaration('const', [
      b.variableDeclarator(
        b.identifier('__INSTRUMENT__'),
        b.arrowFunctionExpression(
          [b.identifier('__IDENTIFIER__')],
          b.blockStatement([
            b.expressionStatement(
              b.callExpression(
                b.memberExpression(
                  b.identifier('console'),
                  b.identifier('log'),
                ),
                [b.identifier('__IDENTIFIER__')],
              ),
            ),
          ]),
        ),
      ),
    ]),
    ...tree.program.body,
  ];

  const newCode = recast.print(tree).code;
  return newCode;
};

const transpiler: Transpiler = {
  transpile: (input, options) => {
    const foo = instrument(input);
    const bar = transpile(foo, {});

    return {
      diagnostics: [],
      outputText: bar,
      sourceMapText: '{}',
    };
  },
};

const factory: TranspilerFactory = (options) => transpiler;

export const create = factory;

// type TransformFactory = (options: unknown) =>

// module.exports.create = (options) => {
//   return {
//     transpile: (input, opt) => {
//       return {
//         outputText:
//       }
//     }
//   }
// }
