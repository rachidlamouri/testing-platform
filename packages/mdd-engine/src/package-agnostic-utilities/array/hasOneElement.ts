export const hasOneElement = <T>(list: T[]): list is [T] => list.length === 1;
