import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { buildNormalizedRootTargetReference } from './buildRootTargetReference';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildNormalizedRootTargetReference');
  })
  .then(() => {
    report('  ⇀ Testing a root target reference configuration');

    const result = buildNormalizedRootTargetReference({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration,
        buildReference: () => ({
          typeId: 'foo',
          instance: 'hello',
          path: 'bar',
        }),
        inputData: 2,
        normalizedInputTargetPath: '',
        outputTargetTypeId: 'foo',
        normalizedOutputTargetPath: 'bar',
      },
    });

    signaler.isDeepEqual(result, {
      typeId: 'foo',
      instance: 'hello',
      instancePath: 'bar',
      normalizedPath: 'bar',
    });
  });
