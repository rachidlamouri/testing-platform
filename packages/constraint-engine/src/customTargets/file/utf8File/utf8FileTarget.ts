type ConfigurableFileProperties = {
  isOnDisk: boolean;
  stringContents?: string;
};

type BaseUtf8FileTarget<TFileProperties extends ConfigurableFileProperties> = {
  filePath: string;
  isOnDisk: TFileProperties['isOnDisk'];
  stringContents: TFileProperties['stringContents'];
};

export type OnDiskUtf8FileTarget = BaseUtf8FileTarget<{
  isOnDisk: true;
  stringContents: string;
}>;

export type NotOnDiskUtf8FileTarget = BaseUtf8FileTarget<{
  isOnDisk: false;
  stringContents?: never;
}>;

export type Utf8FileTarget = OnDiskUtf8FileTarget | NotOnDiskUtf8FileTarget;

export type Utf8FileMetadataTarget = Omit<Utf8FileTarget, 'stringContents'>;
