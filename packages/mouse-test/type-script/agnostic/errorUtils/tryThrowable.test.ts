import {
  orchestrate,
  report,
  signaler,
} from 'rat-test/type-script/transgressing';
import { tryThrowable } from './tryThrowable';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
orchestrate()
  .then(() => {
    report('• tryThrowable');
  })
  .then(() => {
    report('  ⇀ Testing a closure that returns a non-Error');

    const result = tryThrowable(() => 2);

    signaler.isDeepEqual(result, {
      didThrow: false,
      value: 2,
    });
  })
  .then(() => {
    report('  ⇀ Testing a closure that returns an Error');

    const result = tryThrowable(() => new Error('whoops'));

    signaler.isDeepEqual(result, {
      didThrow: false,
      value: new Error('whoops'),
    });
  })
  .then(() => {
    report('  ⇀ Testing a closure that throws an Error');

    const result = tryThrowable(() => {
      throw new Error('whoops');
    });

    signaler.isDeepEqual(result, {
      didThrow: true,
      value: new Error('whoops'),
    });
  })
  .then(() => {
    report('  ⇀ Testing a closure that throws a non-Error');

    const result = tryThrowable(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw 'potato';
    });

    signaler.isDeepEqual(result, {
      didThrow: true,
      value: 'potato',
    });
  });
