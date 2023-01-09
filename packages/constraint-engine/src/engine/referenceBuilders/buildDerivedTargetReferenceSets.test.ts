import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildDerivedTargetReferenceSets } from './buildDerivedTargetReferenceSets';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• buildDerivedTargetReferenceSets');
  })
  .then(() => {
    report('  ⇀ Testing a derived target reference configuration');

    const targetReferenceMap = new TargetReferenceMap();
    targetReferenceMap.setTargetReference({
      typeId: 'Foo',
      instancePath: 'foo/0',
      instance: 'foo 0',
      normalizedPath: 'foo/:index',
    });
    targetReferenceMap.setTargetReference({
      typeId: 'Foo',
      instancePath: 'foo/1',
      instance: 'foo 1',
      normalizedPath: 'foo/:index',
    });

    const result = buildDerivedTargetReferenceSets({
      targetReferenceConfiguration: {
        typeId:
          TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration,
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
        normalizedInputTargetPath: 'foo/:index',
        outputTargetTypeId: 'Bar',
        normalizedOutputTargetPath: 'foo/:index/:barIndex',
      },
      targetReferenceMap,
    });

    signaler.isDeepEqual(result, [
      {
        typeId: 'Bar',
        instance: 'foo 0',
        instancePath: 'foo/0/bar1',
        normalizedPath: 'foo/:index/:barIndex',
      },
      {
        typeId: 'Bar',
        instance: 'foo 0',
        instancePath: 'foo/0/bar2',
        normalizedPath: 'foo/:index/:barIndex',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        instancePath: 'foo/1/bar1',
        normalizedPath: 'foo/:index/:barIndex',
      },
      {
        typeId: 'Bar',
        instance: 'foo 1',
        instancePath: 'foo/1/bar2',
        normalizedPath: 'foo/:index/:barIndex',
      },
    ]);
  });
