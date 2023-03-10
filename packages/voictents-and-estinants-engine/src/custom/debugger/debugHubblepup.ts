import { OnHubblepupAddedToVoictentsHandler } from '../../core/digikikify';
import { isPlifal } from '../adapter/plifal';
import { debugOdeshin } from './debugOdeshin';
import { debugHubblepup as debugCoreHubblepup } from '../../example-programs/core/debugHubblepup';

export const debugHubblepup: OnHubblepupAddedToVoictentsHandler = (quirm) => {
  if (isPlifal(quirm)) {
    debugOdeshin(quirm);
    return;
  }

  debugCoreHubblepup(quirm);
};
