import { assertNotNull } from '../nil/assertNotNull';
import { assertIsInteger } from './assertIsInteger';
import { UnsafeInteger } from './isInteger';

/**
 * Guarantees that a number is an integer
 */
export class Integer<TNumber extends UnsafeInteger> {
  private integerValue: TNumber | null = null;

  constructor(value: TNumber) {
    this.value = value;
  }

  get value(): TNumber {
    assertNotNull(this.integerValue);
    return this.integerValue;
  }

  set value(value: TNumber) {
    assertIsInteger(value);
    this.integerValue = value;
  }
}
