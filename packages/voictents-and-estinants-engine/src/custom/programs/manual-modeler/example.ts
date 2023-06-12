/**
 * An example manual program model outline using TypeScript code as pseudo-code.
 * This code is not meant to run. Instead its AST is parsed and the model is
 * determined by the manual-modeler (modelManually). This program is the same as
 * testGraphRender which can be automatically modeled for comparison
 */

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

// denotes a connection to individual items (i) or the entire collection (c)
type LeftTransformInputStream = 'i' | 'c';

// denotes a connection to one item (i), an item tuple (it) or the entire collection (c)
type RightTransformInputStream = 'i' | 't' | 'c';

// denotes an output of optionally one item (i?), exactly one item (i), or a tuple of items (it)
type TransformOutputStream = 'i?' | 'i' | 't';

type LeftTransformInput = [LeftTransformInputStream, unknown];
type RightTransformInput = [RightTransformInputStream, unknown];
type TransformOutput = [TransformOutputStream, unknown];

type Transform<
  TInputTuple extends readonly [LeftTransformInput, ...RightTransformInput[]],
  TOutputList extends readonly TransformOutput[],
> = (...args: TInputTuple) => TOutputList;

/**
 * A directory path to start traversing the file system to get files and
 * directories
 *
 * --initial
 */
type FileSystemObjectEnumeratorConfiguration = {
  directoryPath: string;
};

type Directory = object;
type File = object;
type BashFile = object;
type HtmlFile = object;
type TypeScriptFile = object;
type YamlFile = object;

/**
 * --initial
 */
type DirectedGraph = object;
type GraphvizCode = string;
type SvgDocument = string;

/**
 * --initial
 */
type DirectedGraphMetdataById = Map<string, object>;

type OutputFile = object;
type SanitySnapshot = Map<string, string>;

export type enumerateFileSystemObjects = Transform<
  [['i', FileSystemObjectEnumeratorConfiguration]],
  [['t', File], ['t', Directory]]
>;

export type categorizeFiles = Transform<
  [['i', File]],
  [['i?', BashFile], ['i?', HtmlFile], ['i?', TypeScriptFile], ['i?', YamlFile]]
>;

export type encodeDirectedGraphAsGraphvizCode = Transform<
  [['i', DirectedGraph]],
  [['i', GraphvizCode]]
>;

/**
 * Converts graphviz code to an svg document
 */
export type renderGraphvizCodeToSvgDocument = Transform<
  [['i', GraphvizCode]],
  [['i', SvgDocument]]
>;

export type addInteractivityToSvgDocument = Transform<
  [['i', SvgDocument], ['i', HtmlFile], ['i', DirectedGraphMetdataById]],
  [['i', OutputFile]]
>;

export type captureoutputFileDigest = Transform<
  [['c', OutputFile]],
  [['i', SanitySnapshot]]
>;
