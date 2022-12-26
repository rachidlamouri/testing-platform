import fs from 'fs';
import { orchestrate, report, signaler } from "rat-test/type-script/transgressing";
import { errorUtil } from '../../agnostic/errorUtils';
import { createDirectory, DirectoryHelper, RootDirectoryHelper, USE_CWD } from './createDirectory';
import { removeFileSystemObject } from './removeFileSystemObject';

orchestrate()
  .then(() => {
    report('• createDirectory')
  })
  .then(() => {
    report('  ⇀ Testing a directory that does not exist')

    const directoryPath = 'foo';
    removeFileSystemObject(directoryPath);
    const isOnDiskBefore = fs.existsSync(directoryPath);

    const result = errorUtil.tryThrowable(() => {
      return createDirectory({
        root: USE_CWD,
        relativePath: directoryPath,
      });
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    removeFileSystemObject(directoryPath);

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: {
        directoryPath: 'foo',
        teardown: (result.value as RootDirectoryHelper).teardown,
      },
    })
    signaler.isTrue(isOnDiskAfter);
  })
  .then(() => {
    report('  ⇀ Testing a directory that exists')

    const directoryPath = 'foo';
    removeFileSystemObject(directoryPath);
    fs.mkdirSync(directoryPath);
    const isOnDiskBefore = fs.existsSync(directoryPath);

    const result = errorUtil.tryThrowable(() => {
      return createDirectory({
        root: USE_CWD,
        relativePath: directoryPath,
      });
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    removeFileSystemObject(directoryPath);

    signaler.isTrue(isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: {
        directoryPath: 'foo',
        teardown: (result.value as RootDirectoryHelper).teardown,
      },
    })
    signaler.isTrue(isOnDiskAfter);
  })
  .then(() => {
    report('  ⇀ Testing a nested directory')

    const inputDirectoryPath1 = 'foo';
    const inputDirectoryPath2 = 'bar';
    const outputDirectoryPath2 = 'foo/bar';
    removeFileSystemObject(inputDirectoryPath1);
    const isOnDiskBefore = fs.existsSync(outputDirectoryPath2);
    const rootHelper = createDirectory({
      root: USE_CWD,
      relativePath: inputDirectoryPath1,
    });

    const result = errorUtil.tryThrowable(() => {
      return createDirectory({
        root: rootHelper,
        relativePath: inputDirectoryPath2,
      });
    });
    const isOnDiskAfter = fs.existsSync(outputDirectoryPath2)
    removeFileSystemObject(inputDirectoryPath1);

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: {
        directoryPath: 'foo/bar',
      },
    })
    signaler.isTrue(isOnDiskAfter);
  })
  .then(() => {
    report('  • teardown')
  })
  .then(() => {
    report('    ⇀ Testing a root directory');

    const directoryPath = 'foo';
    removeFileSystemObject(directoryPath);
    const isOnDiskBefore = fs.existsSync(directoryPath);
    const helper = createDirectory({
      root: USE_CWD,
      relativePath: directoryPath,
    });

    const result = errorUtil.tryThrowable(() => {
      helper.teardown();
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    removeFileSystemObject(directoryPath);

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter);
  })
  .then(() => {
    report('    ⇀ Testing the root of a nested directory')

    const inputDirectoryPath1 = 'foo';
    const inputDirectoryPath2 = 'bar';
    const outputDirectoryPath2 = 'foo/bar';
    removeFileSystemObject(inputDirectoryPath1);
    const isOnDiskBefore = fs.existsSync(outputDirectoryPath2);
    const rootHelper = createDirectory({
      root: USE_CWD,
      relativePath: inputDirectoryPath1,
    });
    createDirectory({
      root: rootHelper,
      relativePath: inputDirectoryPath2,
    })

    const result = errorUtil.tryThrowable(() => {
      rootHelper.teardown();
    });
    const isOnDiskAfter = fs.existsSync(outputDirectoryPath2)
    removeFileSystemObject(inputDirectoryPath1);

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter);
  })

