import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { fileSystemUtil } from 'mouse-test/type-script/shell';
import {
  buildPackageDirectorySetReference,
  TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
} from './buildPackageDirectorySetReference';
import { TargetTypeId } from '../targetTypeIds';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• instantiateTestingPlatformPackageDirectorySetTarget');
  })
  .then(() => {
    report('  ⇀ Testing a directory with files and directories');

    const rootHelper = fileSystemUtil.createDirectory({
      root: fileSystemUtil.USE_CWD,
      relativePath: 'tmp',
    });
    fileSystemUtil.createDirectory({
      root: rootHelper,
      relativePath: 'foo',
    });
    fileSystemUtil.createDirectory({
      root: rootHelper,
      relativePath: 'bar',
    });
    fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'baz',
      contents: '',
    });

    const result = buildPackageDirectorySetReference({
      typeId: TargetTypeId.PackageDirectorySetConfiguration,
      instance: {
        rootDirectoryRelativeToCurrentWorkingDirectory: 'tmp',
      },
      path: 'testingPlatformPackageDirectorySet',
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, [
      {
        typeId: TargetTypeId.PackageDirectorySet,
        instance: ['tmp/bar', 'tmp/foo'],
        path: TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
      },
    ]);
  });
