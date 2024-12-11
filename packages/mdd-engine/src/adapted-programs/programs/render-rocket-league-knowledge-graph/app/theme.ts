// const whiteish = '#C0C1CF';

// const lightBlues = [
//   // -
//   '#2F8399',
//   '#9cd8e8',
//   '#35A3AF',
// ];

// const blues = [
//   // -
//   '#2B5B84',
//   '#27506C',
//   '#263055',
// ];

// const magentas = [
//   // -
//   '#AE266B',
//   '#a25c8e,',
//   '#4E1E50',
// ];

// const purples = [
//   // -
//   '#1E1835',
//   '#231C46',
//   '#2C1E56',
//   '#2A2553',
//   '#543A64',
// ];

const upstream = '#35A3AF';
const downstream = '#C0C1CF';

export const THEME = {
  page: {
    background: '#151b23',
    text: '#C0C1CF',
  },
  metadata: {
    text: '#C0C1CF',
  },
  skill: {
    background: {
      deselected: '#263055',
      selected: '#231C46',
      upstream: '#263055',
      downstream: '#263055',
    },
    border: {
      deselected: '#231C46',
      selected: '#27506C',
      upstream,
      downstream,
    },
    text: {
      deselected: '#C0C1CF',
      selected: '#C0C1CF',
      upstream: '#C0C1CF',
      downstream: '#C0C1CF',
    },
  },
  prerequisite: {
    deselected: '#27506C',
    upstream,
    downstream,
  },
} as const;
