import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { fileSystemUtil } from 'mouse-test/type-script/shell';
import { USE_CWD } from 'mouse-test/type-script/shell/fileSystemUtils/createDirectory';
import { buildUtf8FileInstance } from './buildUtf8FileInstance';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildUtf8FileInstance');
  })
  .then(() => {
    report('  ⇀ Testing a file that exists');

    const rootHelper = fileSystemUtil.createDirectory({
      root: USE_CWD,
      relativePath: 'tmp',
    });
    const fileHelper = fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'file',
      contents: 'hello',
    });

    const result = buildUtf8FileInstance({
      filePath: fileHelper.filePath,
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, {
      filePath: fileHelper.filePath,
      isOnDisk: true,
      stringContents: 'hello',
    });
  })
  .then(() => {
    report('  ⇀ Testing a file that does not exist');

    const result = buildUtf8FileInstance({
      filePath: 'potato',
    });

    signaler.isDeepEqual(result, {
      filePath: 'potato',
      isOnDisk: false,
      stringContents: undefined,
    });
  });
