import { reporter } from 'ikaria-test/type-script/transgressing';

export type Reporter = (message: string) => void;

export const report: Reporter = reporter.log.bind(reporter);
