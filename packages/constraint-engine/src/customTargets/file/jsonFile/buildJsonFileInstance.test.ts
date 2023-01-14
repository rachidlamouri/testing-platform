import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { fileSystemUtil } from 'mouse-test/type-script/shell';
import { USE_CWD } from 'mouse-test/type-script/shell/fileSystemUtils/createDirectory';
import { buildJsonFileInstance } from './buildBuildJsonFileInstance';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildJsonFileInstance');
  })
  .then(() => {
    report('  ⇀ Testing a parseable file');

    const rootHelper = fileSystemUtil.createDirectory({
      root: USE_CWD,
      relativePath: 'tmp',
    });
    const fileHelper = fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'file',
      contents: '{"key":"value"}',
    });

    const result = buildJsonFileInstance({
      filePath: fileHelper.filePath,
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, {
      filePath: fileHelper.filePath,
      isOnDisk: true,
      stringContents: '{"key":"value"}',
      isParseable: true,
      parsedContents: { key: 'value' },
    });
  })
  .then(() => {
    report('  ⇀ Testing an unparseable file');

    const rootHelper = fileSystemUtil.createDirectory({
      root: USE_CWD,
      relativePath: 'tmp',
    });
    const fileHelper = fileSystemUtil.createFile({
      root: rootHelper,
      relativePath: 'file',
      contents: 'whoops',
    });

    const result = buildJsonFileInstance({
      filePath: fileHelper.filePath,
    });

    rootHelper.teardown();

    signaler.isDeepEqual(result, {
      filePath: fileHelper.filePath,
      isOnDisk: true,
      stringContents: 'whoops',
      isParseable: false,
      parsedContents: undefined,
    });
  })
  .then(() => {
    report('  ⇀ Testing a file that does not exist');

    const result = buildJsonFileInstance({
      filePath: 'potato',
    });

    signaler.isDeepEqual(result, {
      filePath: 'potato',
      isOnDisk: false,
      stringContents: undefined,
    });
  });
