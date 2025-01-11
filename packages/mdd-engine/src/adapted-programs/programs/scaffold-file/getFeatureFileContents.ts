import { createFeatureId } from '../../../package-agnostic-utilities/feature-id/featureId';

/**
 * Constructs the boilerplate text for a new feature definition
 */
export const getFeatureFileContents = (args: string[]): string => {
  const [featureName] = args;

  const featureId = createFeatureId();

  const fileContents = `
${featureId.localId}:
  name: ${featureName}
  localId: ${featureId.localId}
  globalId: ${featureId.globalId}
  createdAt: ${new Date().toISOString()}
  description: |

`;

  return fileContents;
};
