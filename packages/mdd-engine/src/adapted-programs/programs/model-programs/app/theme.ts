const colors = {
  plum: '#660033',
  tomahto: 'Tomato',
  edgelord: '#333',
  staleGunpowder: '#ccc',
  graphite: 'Gray',
  grass: 'Green',
  blurple: 'SlateBlue',
  lightBlurple: '#6a5acd66',
  gymboreeBlue: 'RoyalBlue',
};

/**
 * Program modeler react app theme
 */
export const THEME = {
  colors,
  deselected: colors.graphite,
  selection: colors.grass,
  downstreamOfSelection: colors.plum,
  upstreamOfSelection: colors.tomahto,
  collection: colors.graphite,
  transform: colors.graphite,
  navigation: {
    selected: colors.blurple,
    hovered: colors.lightBlurple,
  },
} as const;
