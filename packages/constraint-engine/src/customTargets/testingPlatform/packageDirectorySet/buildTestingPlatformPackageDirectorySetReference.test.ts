import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { fileSystemUtil } from 'mouse-test/type-script/shell';
import {
  buildTestingPlatformPackageDirectorySetReference,
  TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
} from './buildTestingPlatformPackageDirectorySetReference';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';

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

    const result = buildTestingPlatformPackageDirectorySetReference({
      rootDirectoryRelativeToCurrentWorkingDirectory: 'tmp',
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, {
      typeId: TestingPlatformTargetTypeId.PackageDirectorySet,
      instance: ['tmp/bar', 'tmp/foo'],
      path: TESTING_PLATFORM_PACKAGE_DIRECTORY_SET_TARGET_PATH,
    });
  });
