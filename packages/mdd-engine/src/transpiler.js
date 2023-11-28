"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var recast = require("recast");
var ast_types_1 = require("ast-types");
var typescript_1 = require("typescript");
var instrument = function (code) {
    var tree = recast.parse(code);
    var instrumentCount = 0;
    recast.visit(tree, {
        visitBlockStatement: function (path) {
            // eslint-disable-next-line no-param-reassign
            path.node.body = __spreadArray([
                ast_types_1.builders.expressionStatement(ast_types_1.builders.callExpression(ast_types_1.builders.identifier('__INSTRUMENT__'), [
                    ast_types_1.builders.literal(instrumentCount),
                ]))
            ], path.node.body, true);
            instrumentCount += 1;
            this.traverse(path);
        },
    });
    tree.program.body = __spreadArray([
        ast_types_1.builders.variableDeclaration('const', [
            ast_types_1.builders.variableDeclarator(ast_types_1.builders.identifier('__INSTRUMENT__'), ast_types_1.builders.arrowFunctionExpression([ast_types_1.builders.identifier('__IDENTIFIER__')], ast_types_1.builders.blockStatement([
                ast_types_1.builders.expressionStatement(ast_types_1.builders.callExpression(ast_types_1.builders.memberExpression(ast_types_1.builders.identifier('console'), ast_types_1.builders.identifier('log')), [ast_types_1.builders.identifier('__IDENTIFIER__')])),
            ]))),
        ])
    ], tree.program.body, true);
    var newCode = recast.print(tree).code;
    return newCode;
};
var transpiler = {
    transpile: function (input, options) {
        var foo = instrument(input);
        var bar = (0, typescript_1.transpile)(foo, {});
        return {
            diagnostics: [],
            outputText: bar,
            sourceMapText: '{}',
        };
    },
};
var factory = function (options) { return transpiler; };
exports.create = factory;
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
