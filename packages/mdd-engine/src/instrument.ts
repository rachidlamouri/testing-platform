import * as recast from 'recast';
import { namedTypes as n, builders as b } from 'ast-types';
import fs from 'fs';

const text = fs.readFileSync('packages/mdd-engine/src/example2.ts', 'utf8');

const tree = recast.parse(text) as n.File;

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
              b.memberExpression(b.identifier('console'), b.identifier('log')),
              [b.identifier('__IDENTIFIER__')],
            ),
          ),
        ]),
      ),
    ),
  ]),
  ...tree.program.body,
];

console.log(recast.print(tree).code);
