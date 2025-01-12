import { FeatureId } from '../../../package-agnostic-utilities/feature-id/featureId';

/**
 * Constructs the boilerplate text for a new feature definition
 */
export const getFeatureFileContents = (args: string[]): string => {
  const [featureName] = args;

  const featureId = FeatureId.create();

  const fileContents = `
${featureId.local}:
  name: ${featureName}
  localId: ${featureId.local}
  globalId: ${featureId.global}
  createdAt: ${new Date().toISOString()}
  description: |

`;

  return fileContents;
};
