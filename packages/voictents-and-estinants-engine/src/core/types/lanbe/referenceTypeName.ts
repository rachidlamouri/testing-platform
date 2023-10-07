/**
 * An enum to distinguish data that is currently being streamed
 *
 * @readableName StreamableReferenceTypeName
 *
 * @todo turn this into StreamTypeName when we have input streams
 */
export enum ReferenceTypeName {
  VoictentPelie = 'Voictent',
  HubblepupPelie = 'VoictentItem',
  IndexedHubblepupPelie = 'IndexedVoictentItem',
}
