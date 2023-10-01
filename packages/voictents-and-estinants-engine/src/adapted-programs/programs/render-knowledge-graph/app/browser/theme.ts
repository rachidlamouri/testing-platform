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
 * Knowledge graph UI colors grouped by semantics
 */
export const THEME = {
  colors,
  file: {
    selected: colors.grass,
    importsSelectedFile: colors.tomahto,
    importedBySelectedFile: colors.plum,
    deselected: colors.graphite,
  },
  fileDependency: {},
  boundary: {
    selected: colors.blurple,
  },
  partition: {
    selectedForeground: colors.staleGunpowder,
  },
  directory: {
    color: colors.gymboreeBlue,
  },
} as const;
