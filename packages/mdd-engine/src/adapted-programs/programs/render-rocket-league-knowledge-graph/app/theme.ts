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

export const THEME = {
  colors,
  navigation: {
    selected: colors.blurple,
    hovered: colors.lightBlurple,
  },
} as const;
