import { ForegroundColor } from '../colors/colorList';

export type SubprocessConfiguration = {
  label: string;
  script: string;
  color: ForegroundColor;
  isInitiallyVisible: boolean;
};
