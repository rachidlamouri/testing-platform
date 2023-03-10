import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { UnknownTargetReference } from '../../types/targetReference';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildDeprecatedDerivedTargetReferences } from './buildDeprecatedDerivedTargetReferences';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildDerivedTargetReferences');
  })
  .then(() => {
    report('  ⇀ Testing a deprecated derived target reference configuration');

    const targtReferenceMap = new TargetReferenceMap();

    targtReferenceMap.setTargetReference({
      typeId: 'Foo',
      path: 'foo/:index',
      instance: 'foo 0',
    });
    targtReferenceMap.setTargetReference({
      typeId: 'Foo',
      path: 'foo/:index',
      instance: 'foo 1',
    });

    const result = buildDeprecatedDerivedTargetReferences({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration,
        buildReference: (inputReference: UnknownTargetReference) => [
          {
            typeId: 'Bar',
            instance: inputReference.instance,
            path: `${inputReference.path}/bar`,
          },
        ],
        inputTargetTypeId: 'Foo',
        inputTargetPath: 'foo/:index',
        conditions: [],
      },
      targetReferenceMap: targtReferenceMap,
    });

    signaler.isDeepEqual(result, [
      {
        typeId: 'Bar',
        instance: 'foo 0',
        path: 'foo/0/bar',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        path: 'foo/1/bar',
      },
    ]);
  });
