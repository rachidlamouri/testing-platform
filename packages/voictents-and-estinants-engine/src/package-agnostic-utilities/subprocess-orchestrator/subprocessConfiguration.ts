import { ForegroundColor } from '../color/colorList';

export type SubprocessConfiguration = {
  label: string;
  script: string;
  color: ForegroundColor;
  isInitiallyVisible: boolean;
};
