import fs from 'fs';
import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { errorUtil } from '../../agnostic/errorUtils';
import { createFile } from './createFile';
import { createDirectory, USE_CWD } from './createDirectory';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• createMockFile');
  })
  .then(() => {
    report('  ⇀ Testing creating a file');

    const outputFilePath = 'foo/bar';
    const rootHelper = createDirectory({
      root: USE_CWD,
      relativePath: 'foo',
    });
    const isOnDiskBefore = fs.existsSync(outputFilePath);

    const creationResult = errorUtil.tryThrowable(() => {
      return createFile({
        root: rootHelper,
        relativePath: 'bar',
        contents: 'Hello!',
      });
    });
    const isOnDiskAfter = fs.existsSync(outputFilePath);
    const fileContentsResult = errorUtil.tryThrowable(() => {
      return fs.readFileSync(outputFilePath, 'utf8');
    });

    rootHelper.teardown();

    signaler.isTrue(!isOnDiskBefore);
    signaler.isDeepEqual(creationResult, {
      didThrow: false,
      value: {
        filePath: 'foo/bar',
        contents: 'Hello!',
      },
    });
    signaler.isTrue(isOnDiskAfter);
    signaler.isDeepEqual(fileContentsResult, {
      didThrow: false,
      value: 'Hello!',
    });
  });
