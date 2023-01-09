import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { fileSystemUtil } from 'mouse-test/type-script/shell';
import { TestingPlatformTargetTypeId } from './targets';
import { buildTestingPlatformPackageAReference } from './buildTestingPlatformPackageAReference';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildTestingPlatformPackageAReference');
  })
  .then(() => {
    report('  ⇀ Testing a package with the expected files');

    const rootHelper = fileSystemUtil.createDirectory({
      root: fileSystemUtil.USE_CWD,
      relativePath: 'tmp',
    });
    fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'package.json',
      contents: '{}',
    });
    fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'tsconfig.json',
      contents: '{}',
    });

    const result = buildTestingPlatformPackageAReference({
      typeId: TestingPlatformTargetTypeId.PackageDirectory,
      instance: {
        directoryPath: 'tmp',
        index: 0,
      },
      path: 'abc/:directoryName',
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, [
      {
        typeId: TestingPlatformTargetTypeId.PackageA,
        instance: {
          directoryName: 'tmp',
          packageFile: {
            filePath: 'tmp/package.json',
            isOnDisk: true,
            isParseable: true,
            stringContents: '{}',
            parsedContents: {},
          },
          typeScriptConfigFile: {
            filePath: 'tmp/tsconfig.json',
            isOnDisk: true,
            isParseable: true,
            stringContents: '{}',
            parsedContents: {},
          },
        },
        path: 'abc/:directoryName',
      },
    ]);
  });
