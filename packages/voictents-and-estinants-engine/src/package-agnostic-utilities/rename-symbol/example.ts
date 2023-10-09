/**
 * DELETE ME
 *
 * @canonicalComment
 *
 * @noCanonicalDeclaration
 */

// import { spawn } from 'child_process';
// import * as uuid from 'uuid';
// import { JsonArray, JsonObject } from 'type-fest';
// import { posix } from 'path';
// import { TextTransform } from './package-agnostic-utilities/subprocess-orchestrator/transforms/textTransform';
// import { Json, jsonUtils } from './package-agnostic-utilities/json/json';

// // const data = {
// //   processId: null,
// //   rootUri: 'file://packages/voictents-and-estinants-engine',
// //   // tsserver: {
// //   //   path: 'node_modules/.bin/tsserver',
// //   // },
// // };

// // const message = buildRpcMessage('initialize', {
// //   processId: null,
// //   capabilities: {},
// //   // rootUri:
// //   //   'file:///home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine',
// //   workspaceFolders: [
// //     {
// //       uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine',
// //       name: 'mdd-engine',
// //     },
// //   ],
// // });

// // const message = buildRpcMessage('textDocument/prepareRename', {
// //   textDocument: {
// //     uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
// //   },
// //   position: {
// //     line: 0,
// //     character: 9,
// //   },
// // });

// // // const serialized = JSON.stringify(data);

// // childProcess.stdin.write(message);

// // const childProcess = spawn('npx', ['typescript-language-server', '--stdio']);
// const childProcess = spawn('npx', ['tsserver']);

// childProcess.on('exit', (code, signal) => {
//   console.log({
//     code,
//     signal,
//   });
// });

// enum Status {
//   AwaitingHeader = 'AwaitingHeader',
//   AwaitingHeader = 'AwaitingHeader',
//   ReadingContent = 'ReadingContent',
// }

// const state = {
//   status: Status.AwaitingHeader,
//   contentLength: 0,
// };

// const readRpcMessage = (message: string): Json => {
//   const partList = message.split('\r\n');
//   const serialized = partList[partList.length - 1];

//   const data = jsonUtils.parse(serialized);

//   return data;
// };

// let responseCount = 0;

// class IDK extends TextTransform {
//   buffer: string[] = [];

//   constructor() {
//     super({
//       onTransform: (text): string => {
//         this.buffer.push(text);

//         const fullMessage = this.buffer.join('');

//         try {
//           const data = readRpcMessage(fullMessage);
//           console.log(jsonUtils.multilineSerialize(data));

//           if ('message' in data) {
//             console.log(data.message);
//           }

//           responseCount += 1;

//           if (responseCount === 1) {
//             doMore();
//           }

//           this.buffer = [];
//         } catch {
//           console.log('oof');
//           // no op
//         }

//         return text;
//       },
//     });
//   }
// }

// childProcess.stdout.pipe(new IDK());

// const buildMessage = (
//   command: string,
//   args: JsonArray | JsonObject,
// ): string => {
//   // // `Content-Length: ${contentLength}\r\n\r\n${serialized}`

//   // const id = uuid.v4();
//   // console.log(id);

//   // const content = {
//   //   jsonRpc: '2.0',
//   //   id,
//   //   method,
//   //   params,
//   // };

//   // const serializedContent = JSON.stringify(content);

//   // const contentLength = serializedContent.length;

//   // // return `Content-Length: ${contentLength}\r\n\r\n${serializedContent}`;
//   // return `${serializedContent}\r\n`;

//   const request = {
//     seq: 0,
//     type: 'request',
//     command,
//     arguments: args,
//   };

//   const serializedRequest = JSON.stringify(request);

//   return `${serializedRequest}\r\n`;
// };

// function doMore() {
//   // const message2 = buildRpcMessage('textDocument/prepareRename', {
//   //   textDocument: {
//   //     uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//   //   },
//   //   position: {
//   //     line: 0,
//   //     character: 9,
//   //   },
//   // });
//   // console.log(message2);
//   // // const serialized = JSON.stringify(data);
//   // childProcess.stdin.write(message2);

//   // RENAME REQUEST!!!
//   // https://github.com/microsoft/TypeScript/blob/d1a2e7e730cb8ebd44662ece6b263e2d4d885da2/src/server/protocol.ts#L1301
//   // const message = buildMessage('rename', {
//   //   file: '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//   //   // projectFileName: '../tsconfig.json',
//   //   projectFileName:
//   //     '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/tsconfig.json',
//   //   // line: 1,
//   //   // offset: 10,
//   //   // textDocument: {
//   //   //   uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//   //   // },
//   //   // position: {
//   //   //   line: 0,
//   //   //   character: 9,
//   //   // },
//   //   position: 10,
//   // });

//   const message = buildMessage('open', {
//     file: '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//     // needFileNameList: true,
//     // projectFileName: '../tsconfig.json',
//     // projectFileName:
//     //   '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/tsconfig.json',
//     // line: 1,
//     // offset: 10,
//     // textDocument: {
//     //   uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//     // },
//     // position: {
//     //   line: 0,
//     //   character: 9,
//     // },
//     // position: 10,
//   });

//   // console.log(message);

//   childProcess.stdin.write(message);

//   // const message2 = buildMessage('rename', {
//   //   file: '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//   //   // projectFileName: '../tsconfig.json',
//   //   // projectFileName:
//   //   //   '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/tsconfig.json',
//   //   // line: 1,
//   //   // offset: 10,
//   //   // textDocument: {
//   //   //   uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//   //   // },
//   //   position: {
//   //     line: 44,
//   //     character: 7,
//   //   },
//   //   // position: 10,
//   // });

//   const potato = buildMessage('rename', {
//     file: '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//     // projectFileName: '../tsconfig.json',
//     // projectFileName:
//     //   '/home/rachid/projects/testing-platform/packages/voictents-and-estinants-engine/tsconfig.json',
//     line: 220,
//     offset: 9,
//     // line: 1,
//     // offset: 10,
//     // textDocument: {
//     //   uri: 'file://~/projects/testing-platform/packages/voictents-and-estinants-engine/src/example.ts',
//     // },
//     // position: {
//     //   line: 220,
//     //   offset: 11,
//     // },
//     // position: 5917,
//   });
//   childProcess.stdin.write(potato);
// }
