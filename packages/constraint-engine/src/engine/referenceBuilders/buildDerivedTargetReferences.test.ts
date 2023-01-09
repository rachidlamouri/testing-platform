import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { UnknownTargetReference } from '../../types/targetReference';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { NormalizedTargetReferenceMap } from '../targetReferenceMap';
import { buildNormalizedDerivedTargetReferences } from './buildDerivedTargetReferences';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildNormalizedDerivedTargetReferences');
  })
  .then(() => {
    report('  ⇀ Testing a derived target reference configuration');

    const normalizedTargetReferenceMap = new NormalizedTargetReferenceMap();

    normalizedTargetReferenceMap.setNormalizedReference({
      typeId: 'Foo',
      instancePath: 'foo/0',
      instance: 'foo 0',
      normalizedPath: 'foo/:index',
    });
    normalizedTargetReferenceMap.setNormalizedReference({
      typeId: 'Foo',
      instancePath: 'foo/1',
      instance: 'foo 1',
      normalizedPath: 'foo/:index',
    });

    const result = buildNormalizedDerivedTargetReferences({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
        buildReference: (inputReference: UnknownTargetReference) => ({
          typeId: 'Bar',
          instance: inputReference.instance,
          path: `${inputReference.path}/bar`,
        }),
        inputTargetTypeId: 'Foo',
        normalizedInputTargetPath: 'foo/:index',
        outputTargetTypeId: ['Bar'],
        normalizedOutputTargetPath: 'foo/:index/bar',
        conditions: [],
      },
      normalizedTargetReferenceMap,
    });

    signaler.isDeepEqual(result, [
      {
        typeId: 'Bar',
        instance: 'foo 0',
        instancePath: 'foo/0/bar',
        normalizedPath: 'foo/:index/bar',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        instancePath: 'foo/1/bar',
        normalizedPath: 'foo/:index/bar',
      },
    ]);
  });
