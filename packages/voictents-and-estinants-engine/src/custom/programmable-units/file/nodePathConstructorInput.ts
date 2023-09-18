export type NodePathConstructorInput = {
  serialized: string;
  // TODO: remove "ancestorDirectoryPathSet" and just compute it when needed. Its unnecessary in cases like scaffoldFile
  ancestorDirectoryPathSet: string[];
};
