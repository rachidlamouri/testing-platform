import fs from 'fs';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
  ProgramErrorElementLocatorTypeName,
  ReceivedProgramError,
  ReportingEstinantLocator,
} from '../../../programmable-units/error/programError';

const ESTINANT_NAME = 'assertBoundaryDirectoryExists' as const;
type EstinantName = typeof ESTINANT_NAME;
type ReportingLocator = ReportingEstinantLocator<EstinantName>;
const reporterLocator: ReportingLocator = {
  typeName: ProgramErrorElementLocatorTypeName.ReportingEstinantLocator,
  name: ESTINANT_NAME,
  filePath: __filename,
};

/**
 * Verifies that a boundaries declared directory is a real directory
 */
export const assertBoundaryDirectoryExists = buildEstinant({
  name: 'assertBoundaryDirectoryExists',
})
  .fromHubblepup2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((boundary) => {
    if (
      fs.existsSync(boundary.directoryPath) &&
      fs.statSync(boundary.directoryPath).isDirectory()
    ) {
      return [];
    }

    return [
      {
        name: 'nonexistent-boundary',
        error: new Error(
          `Boundary "${boundary.directoryPath}" does not exist or is not a directory`,
        ),
        reporterLocator,
        sourceLocator: {
          typeName: ProgramErrorElementLocatorTypeName.SourceFileLocator,
          filePath:
            'packages/voictents-and-estinants-engine/src/custom/programs/render-knowledge-graph/boundary/boundary.ts',
        },
        context: {
          boundary,
        },
      } satisfies ReceivedProgramError<ReportingLocator>,
    ];
  })
  .assemble();
