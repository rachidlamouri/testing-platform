import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { TestingPlatformTargetTypeId } from '../targetTypeIds';
import { buildTestingPlatformPackageDirectoryReferenceSet } from './buildPackageDirectoryReferenceSet';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• instantiateTestingPlatformPackageDirectoryTargetSet');
  })
  .then(() => {
    report('  ⇀ Testing multiple directories');

    const result = buildTestingPlatformPackageDirectoryReferenceSet({
      typeId: TestingPlatformTargetTypeId.PackageDirectorySet,
      instance: ['tmp/bar', 'tmp/foo'],
      path: 'some-prefix',
    });

    signaler.isDeepEqual(result, [
      {
        typeId: TestingPlatformTargetTypeId.PackageDirectory,
        instance: {
          directoryPath: 'tmp/bar',
          index: 0,
        },
        path: `some-prefix/0`,
      },
      {
        typeId: TestingPlatformTargetTypeId.PackageDirectory,
        instance: {
          directoryPath: 'tmp/foo',
          index: 1,
        },
        path: `some-prefix/1`,
      },
    ]);
  });
