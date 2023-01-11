import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { buildRootTargetReference } from './buildRootTargetReference';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildRootTargetReference');
  })
  .then(() => {
    report('  ⇀ Testing a root target reference configuration');

    const result = buildRootTargetReference({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration,
        buildReference: () => ({
          typeId: 'foo',
          instance: 'hello',
          path: 'bar',
        }),
        inputInstance: 2,
        inputTargetPath: '',
        outputTargetTypeId: 'foo',
        outputTargetPath: 'bar',
      },
    });

    signaler.isDeepEqual(result, {
      typeId: 'foo',
      instance: 'hello',
      path: 'bar',
    });
  });
