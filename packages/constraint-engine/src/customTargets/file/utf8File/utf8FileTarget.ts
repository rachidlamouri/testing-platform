type BaseUtf8FileTarget<T> = {
  filePath: string;
} & T;

export type OnDiskUtf8FileTarget = BaseUtf8FileTarget<{
  isOnDisk: true;
  stringContents: string;
}>;

export type NotOnDiskUtf8FileTarget = BaseUtf8FileTarget<{
  isOnDisk: false;
  stringContents?: never;
}>;

export type Utf8FileTarget = OnDiskUtf8FileTarget | NotOnDiskUtf8FileTarget;
