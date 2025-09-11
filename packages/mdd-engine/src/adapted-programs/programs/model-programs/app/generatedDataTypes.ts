/**
 * Types that model-programs uses for generating data, and that the
 * program model app uses when presenting the generated data.
 *
 * @noCanonicalDeclaration
 * @todo this file should probably be broken up or renamed
 */

import React from 'react';

type SvgWrapperComponent = React.FunctionComponent<{
  ref: React.LegacyRef<SVGSVGElement>;
}>;

export type ProgramMetadata = {
  programName: string;
  Component: SvgWrapperComponent;
};

export type GeneratedIndex = {
  programList: ProgramMetadata[];
};
