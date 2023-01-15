import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildDeprecatedDerivedTargetReferenceSets } from './buildDeprecatedDerivedTargetReferenceSets';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildDerivedTargetReferenceSets');
  })
  .then(() => {
    report('  ⇀ Testing a deprecated derived target reference configuration');

    const targetReferenceMap = new TargetReferenceMap();
    targetReferenceMap.setTargetReference({
      typeId: 'Foo',
      path: 'foo/:index',
      instance: 'foo 0',
    });
    targetReferenceMap.setTargetReference({
      typeId: 'Foo',
      path: 'foo/:index',
      instance: 'foo 1',
    });

    const result = buildDeprecatedDerivedTargetReferenceSets({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration,
        buildReferenceSet: (inputReference) => {
          return [
            {
              typeId: 'Bar',
              instance: inputReference.instance,
              path: `${inputReference.path}/bar1`,
            },
            {
              typeId: 'Bar',
              instance: inputReference.instance,
              path: `${inputReference.path}/bar2`,
            },
          ];
        },
        inputTargetTypeId: 'Foo',
        inputTargetPath: 'foo/:index',
      },
      targetReferenceMap,
    });

    signaler.isDeepEqual(result, [
      {
        typeId: 'Bar',
        instance: 'foo 0',
        path: 'foo/0/bar1',
      },
      {
        typeId: 'Bar',
        instance: 'foo 0',
        path: 'foo/0/bar2',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        path: 'foo/1/bar1',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        path: 'foo/1/bar2',
      },
    ]);
  });
