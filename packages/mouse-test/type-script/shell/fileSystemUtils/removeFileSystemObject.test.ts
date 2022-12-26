import fs from 'fs';
import { orchestrate, report, signaler } from "rat-test/type-script/transgressing";
import { removeFileSystemObject } from './removeFileSystemObject';
import { errorUtil } from '../../agnostic/errorUtils';

orchestrate()
  .then(() => {
    report('• removeFileSystemObject')
  })
  .then(() => {
    report('  ⇀ Testing a file that exists')

    const filePath = 'foo';
    errorUtil.tryThrowable(() => {
      fs.rmSync(filePath, { recursive: true });
    });
    fs.writeFileSync(filePath, '');
    const isOnDiskBefore = fs.existsSync(filePath);

    const result = errorUtil.tryThrowable(() => {
      removeFileSystemObject(filePath);
    });
    const isOnDiskAfter = fs.existsSync(filePath)
    errorUtil.tryThrowable(() => {
      fs.rmSync(filePath, { recursive: true });
    });

    signaler.isTrue(isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter);
  })
  .then(() => {
    report('  ⇀ Testing a file that does not exist')

    const filePath = 'foo';
    errorUtil.tryThrowable(() => {
      fs.rmSync(filePath, { recursive: true });
    });
    const isOnDiskBefore = fs.existsSync(filePath);

    const result = errorUtil.tryThrowable(() => {
      removeFileSystemObject(filePath);
    });
    const isOnDiskAfter = fs.existsSync(filePath);
    errorUtil.tryThrowable(() => {
      fs.rmSync(filePath, { recursive: true });
    });

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter);
  })
  .then(() => {
    report('  ⇀ Testing a directory that exists')

    const directoryPath = 'foo';
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });
    fs.mkdirSync(directoryPath);
    const isOnDiskBefore = fs.existsSync(directoryPath)

    const result = errorUtil.tryThrowable(() => {
      removeFileSystemObject(directoryPath);
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });

    signaler.isTrue(isOnDiskBefore)
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter)
  })
  .then(() => {
    report('  ⇀ Testing a directory with data')

    const directoryPath = 'foo';
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });
    fs.mkdirSync(directoryPath);
    fs.writeFileSync(`${directoryPath}/file`, '')
    const isOnDiskBefore = fs.existsSync(directoryPath)

    const result = errorUtil.tryThrowable(() => {
      removeFileSystemObject(directoryPath);
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });

    signaler.isTrue(isOnDiskBefore);
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter);
  })
  .then(() => {
    report('  ⇀ Testing a directory that does not exist')

    const directoryPath = 'foo';
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });
    const isOnDiskBefore = fs.existsSync(directoryPath)

    const result = errorUtil.tryThrowable(() => {
      removeFileSystemObject(directoryPath);
    });
    const isOnDiskAfter = fs.existsSync(directoryPath)
    errorUtil.tryThrowable(() => {
      fs.rmSync(directoryPath, { recursive: true });
    });

    signaler.isTrue(!isOnDiskBefore)
    signaler.isDeepEqual(result, {
      didThrow: false,
      value: undefined,
    })
    signaler.isTrue(!isOnDiskAfter)
  })

