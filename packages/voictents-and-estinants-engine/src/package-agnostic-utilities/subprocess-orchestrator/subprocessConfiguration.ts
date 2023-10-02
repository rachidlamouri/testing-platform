import { ForegroundColor } from '../color/colorList';

/**
 * The information needed to run a subprocess
 */
export type SubprocessConfiguration = {
  label: string;
  script: string;
  color: ForegroundColor;
  isInitiallyVisible: boolean;
};
